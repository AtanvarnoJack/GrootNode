var express = require('express');
var credentials = require('../amzWs/credentials_template');
var router = express.Router();

var aws = require("../amzWs/lib/aws");
prodAdv = aws.createProdAdvClient(credentials.accessKeyId, credentials.secretAccessKey, credentials.nameAccess);

//example: http://localhost:3000/amazon?searchIndex=Books&keywords=nodejs
router.get('/', function (req, res) {
    prodAdv.call("ItemSearch", {SearchIndex: req.query.searchIndex, Keywords: req.query.keywords}, function(err, result) {
      res.json(result);
    })
});

//example: http://localhost:3000/amazon/Lookup?idType=UPC&itemId=635753490879&reponseGroup=Large&searchIndex=All
//http://localhost:3000/amazon/Lookup?idType=ASIN&itemId=1617292036&reponseGroup=Large
router.get('/Lookup', function (req, res) {
    prodAdv.call("ItemLookup", {IdType: req.query.idType, ItemId:req.query.itemId, ResponseGroup:req.query.reponseGroup, SearchIndex:req.query.searchIndex}, function(err, result) {
      res.json(result);
    })
});

module.exports = router;