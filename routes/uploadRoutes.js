
const S3 = require('aws-sdk').S3;
const uuid = require('uuid/v1');

const keys = require('../config/keys');

const s3 = new S3({
    accessKeyId : keys.accessKeyId,
    secretAccessKey : keys.secretKey,
    signatureVersion : 'v4',
    region : 'ap-south-1'
})

module.exports = app => {
    app.get('/api/upload' , (req,res,next) => {
        const key  = `${req.user.id}/${uuid()}.jpeg`
        s3.getSignedUrl('putObject' , {
            Bucket: 'blogster-bucket-8358',
            Key: key,
            ContentType: 'image/jpeg'
        },(err , url) => {
            res.send({
                key,url
            });
        })
    });
}

