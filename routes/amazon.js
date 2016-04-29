var express = require('express');
var credentials = require('../amzWs/credentials_template');
var router = express.Router();

var aws = require("../amzWs/lib/aws");
prodAdv = aws.createProdAdvClient(credentials.accessKeyId, credentials.secretAccessKey, credentials.nameAccess);

//example: http://localhost:3000/amazon/Search?searchIndex=Books&keywords=nodejs
//all Index: 'All','Wine','Wireless','ArtsAndCrafts','Miscellaneous','Electronics','Jewelry','MobileApps','Photo','Shoes','KindleStore','Automotive','Pantry','MusicalInstruments','DigitalMusic','GiftCards','FashionBaby','FashionGirls','GourmetFood','HomeGarden','MusicTracks','UnboxVideo','FashionWomen','VideoGames','FashionMen','Kitchen','Video','Software','Beauty','Grocery',,'FashionBoys','Industrial','PetSupplies','OfficeProducts','Magazines','Watches','Luggage','OutdoorLiving','Toys','SportingGoods','PCHardware','Movies','Books','Collectibles','VHS','MP3Downloads','Fashion','Tools','Baby','Apparel','Marketplace','DVD','Appliances','Music','LawnAndGarden','WirelessAccessories','Blended','HealthPersonalCare','Classical'
router.get('/Search', function (req, res) {
	prodAdv.call("ItemSearch", {SearchIndex: req.query.searchIndex, Keywords: req.query.keywords}, function(err, result) {
		res.json(result);
	})
});

//example: http://localhost:3000/amazon/Lookup?idType=UPC&itemId=635753490879&reponseGroup=Large&searchIndex=All
//http://localhost:3000/amazon/Lookup?idType=ASIN&itemId=1617292036&reponseGroup=Large
//all id: 'ASIN', 'SKU', 'UPC', 'EAN','ISBN'
router.get('/Lookup', function (req, res) {
	prodAdv.call("ItemLookup", {IdType: req.query.idType, ItemId:req.query.itemId, ResponseGroup:req.query.reponseGroup, SearchIndex:req.query.searchIndex}, function(err, result) {
		res.json(result);
	})
});

//example: http://localhost:3000/amazon/List?searchIndex=Books&keywords=nodejs
router.get('/List', function (req, res){
	var q = [];
	var details = [];
	var titles = [];
	var prices = [];

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
					try {
						console.log(result.ItemLookupResponse.Items[0].Item[0].OfferSummary[0]);
						prices.push(result.ItemLookupResponse.Items[0].Item[0].OfferSummary[0].LowestUsedPrice[0].FormattedPrice[0]);
					} catch (ex) {
						console.log("$");
						prices.push("$");
					}

					titles.push(v.ItemAttributes[0].Title);
					resolve();
				})
			});
		});

		Promise.all(q).then(function(){
			//console.log(details[1].ItemLookupResponse.Items[0].Item[0].OfferSummary[0].LowestNewPrice[0].FormattedPrice[0]);
			res.render('produits', {
			 details : details ,
			 titles : titles ,
			 prices : prices
			})
		});
	});
});

	module.exports = router; 