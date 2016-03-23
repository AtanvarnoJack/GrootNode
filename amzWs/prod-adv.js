
var aws = require("../amzWs/lib/aws");
var credentials = require('../amzWs/credentials_template');

prodAdv = aws.createProdAdvClient(credentials.accessKeyId, credentials.secretAccessKey, credentials.nameAccess);

prodAdv.call("ItemSearch", {SearchIndex: "Books", Keywords: "Javascript"}, function(err, result) {
  console.log(JSON.stringify(result));
})

prodAdv.call("ItemLookup", {IdType: "UPC", ItemId:"635753490879"}, function(err, result) {
  console.log(JSON.stringify(result));
})