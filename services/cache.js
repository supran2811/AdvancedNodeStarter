const redis = require('redis');
const keys = require('../config/keys');

const client = redis.createClient(keys.redisUrl);

const util = require('util');

const mongoose = require('mongoose');

const exec = mongoose.Query.prototype.exec;

client.hget = util.promisify(client.hget);

mongoose.Query.prototype.cache = function(options = {}) {
    this.useCache = true; // To set that caching will be used in exec
    this.hashKey = JSON.stringify(options.key || "");

    return this; // In order to support chaining of functions.
}

mongoose.Query.prototype.exec = async function() {
    if(!this.useCache) {
        return exec.apply(this,arguments);
    }

    const key = JSON.stringify({...this.getQuery() , collection: this.mongooseCollection.name});

    const result = await client.hget(this.hashKey,key);

    if(result) {
        const doc = JSON.parse(result);

        return (Array.isArray(doc)) 
            ?  doc.map(d => new this.model(d))
            :  new this.model(doc);
    }
    

    const data = await exec.apply(this,arguments);

    if(data) {
        client.hset(this.hashKey, key , JSON.stringify(data));
    }

    return data;
}


module.exports = {
    clearCache: function (hashKey) {
            client.del(JSON.stringify(hashKey));
    }
}