var express = require('express');
var router = express.Router();

var aws = require("../amzWs/lib/aws");
prodAdv = aws.createProdAdvClient("AKIAI5DYIU54FS6KUT7A", "2+bzY+sLbT3HDgBScxuyVjRECArq9AlXuTvMe9DU","Alex");

router.get('/', function (req, res) {
    prodAdv.call("ItemSearch", {SearchIndex: req.query.searchIndex, Keywords: req.query.keywords}, function(err, result) {
      console.log(req.query.searchIndex);
      console.log(req.query.keywords);
      res.json(result);
    })
});

module.exports = router;