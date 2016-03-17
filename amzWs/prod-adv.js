
var aws = require("../amzWs/lib/aws");
prodAdv = aws.createProdAdvClient("AKIAI5DYIU54FS6KUT7A", "2+bzY+sLbT3HDgBScxuyVjRECArq9AlXuTvMe9DU","Alex");
//prodAdv = aws.createProdAdvClient(yourAccessKeyId, yourSecretAccessKey, yourAssociateTag);

prodAdv.call("ItemSearch", {SearchIndex: "Books", Keywords: "Javascript"}, function(err, result) {
  console.log(JSON.stringify(result));
})