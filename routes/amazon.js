var express = require('express');
var credentials = require('../amzWs/credentials_template');
var router = express.Router();

var aws = require("../amzWs/lib/aws");
prodAdv = aws.createProdAdvClient(credentials.accessKeyId, credentials.secretAccessKey, credentials.nameAccess);

//example: http://localhost:3000/amazon/Search?searchIndex=Books&keywords=nodejs
router.get('/Search', function (req, res) {
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

router.get('/List', function (req, res){
	var q = [];
	var details = [];

	var search = new Promise ( function (resolve, reject){
		prodAdv.call("ItemSearch", {SearchIndex: req.query.searchIndex, Keywords: req.query.keywords}, function(err, result) {
			resolve(result);
		})
	});

	search.then(function(data){
		data.ItemSearchResponse.Items[0].Item.forEach(function(v,i,a){
			
			q[i] = new Promise( function (resolve, reject){
				prodAdv.call("ItemLookup", {IdType: 'ASIN', ItemId: v.ASIN, ResponseGroup:'Large'}, function(err, result) {
					details.push(result); 
					resolve();
				})
			});
		});


		Promise.all(q).then(function(){
			res.render('produits', {
			 details : details 
			})
		});

	});

});

	module.exports = router; 