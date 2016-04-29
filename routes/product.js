var express = require('express');
var router = express.Router();
var amazonIndex = ["All","Wine","Wireless","ArtsAndCrafts","Miscellaneous","Electronics","Jewelry","MobileApps","Photo","Shoes","KindleStore","Automotive","Pantry","MusicalInstruments","DigitalMusic","GiftCards","FashionBaby","FashionGirls","GourmetFood","HomeGarden","MusicTracks","UnboxVideo","FashionWomen","VideoGames","FashionMen","Kitchen","Video","Software","Beauty","Grocery","FashionBoys","Industrial","PetSupplies","OfficeProducts","Magazines","Watches","Luggage","OutdoorLiving","Toys","SportingGoods","PCHardware","Movies","Books","Collectibles","VHS","MP3Downloads","Fashion","Tools","Baby","Apparel","Marketplace","DVD","Appliances","Music","LawnAndGarden","WirelessAccessories","Blended","HealthPersonalCare","Classical"];
var credentials = require('../amzWs/credentials_template');

var aws = require("../amzWs/lib/aws");
prodAdv = aws.createProdAdvClient(credentials.accessKeyId, credentials.secretAccessKey, credentials.nameAccess);


//example: http://localhost:3000/produits?searchIndex=Books&keywords=nodejs
router.get('/', function (req, res, next){
	var q = [];
	var details = [];
	var titles = [];
	var prices = [];

	if (req.query.searchIndex !== undefined && req.query.keywords !== undefined){
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
							console.log(result.ItemLookupResponse.Items[0].Item[0].OfferSummary[0].LowestUsedPrice[0].FormattedPrice[0]);
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
				 prices : prices ,
				 title: 'Produits',
				 active:'/produits',
				 amazonIndex: amazonIndex,
				 searchCat : req.query.searchIndex,
			 	 searchKeyWord : req.query.keywords
				})
			});
		});
	}else{
		res.render('produits', { 
			title: 'Produits', 
			active:'/produits', 
			amazonIndex: amazonIndex,
			searchCat : "All",
		 });
	}
});

module.exports = router;