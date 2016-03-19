var express = require('express');
var credentials = require('../amzWs/credentials_template');
var router = express.Router();

var aws = require("../amzWs/lib/aws");
prodAdv = aws.createProdAdvClient(credentials.accessKeyId, credentials.secretAccessKey, credentials.nameAccess);

router.get('/', function (req, res) {
    prodAdv.call("ItemSearch", {SearchIndex: req.query.searchIndex, Keywords: req.query.keywords}, function(err, result) {
      console.log(req.query.searchIndex);
      console.log(req.query.keywords);
      res.json(result);
    })
});

module.exports = router;