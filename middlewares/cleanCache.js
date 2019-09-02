const { clearCache } = require('../services/cache');

module.exports = async function(req,res,next) {
    await next(); // Call the next requst handler to check if it actually finished the operation.
    clearCache(req.user.id); // Then clear the cache
}