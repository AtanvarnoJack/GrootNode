var express = require('express');
var router = express.Router();
var amazonIndex = ["All","Wine","Wireless","ArtsAndCrafts","Miscellaneous","Electronics","Jewelry","MobileApps","Photo","Shoes","KindleStore","Automotive","Pantry","MusicalInstruments","DigitalMusic","GiftCards","FashionBaby","FashionGirls","GourmetFood","HomeGarden","MusicTracks","UnboxVideo","FashionWomen","VideoGames","FashionMen","Kitchen","Video","Software","Beauty","Grocery","FashionBoys","Industrial","PetSupplies","OfficeProducts","Magazines","Watches","Luggage","OutdoorLiving","Toys","SportingGoods","PCHardware","Movies","Books","Collectibles","VHS","MP3Downloads","Fashion","Tools","Baby","Apparel","Marketplace","DVD","Appliances","Music","LawnAndGarden","WirelessAccessories","Blended","HealthPersonalCare","Classical"];

/* GET Product page. */
router.get('/', function(req, res, next) {
  res.render('produits', { title: 'Produits', active:'/produits', amazonIndex: amazonIndex });
});

module.exports = router;