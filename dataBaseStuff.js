const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://VSC:528491@summer2020-qvltj.mongodb.net/BusinessCatalog?retryWrites=true&w=majority";
//Used for inserting into database
MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("BusinessCatalog");
  var myobj = { username: "Samir Desai", password: "opensesame", address: "Neverland", BusinessName: "Boosh Bukner", BusinessType: "Shelter", Description: "Some description", 
  Catalog: [{"Eggo Waffles": "$2.95" }, {"La Croix - 12 pack": "$4.00"}, {"Bread": "$2.00"}]};
  dbo.collection("logins").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    });
    db.close();
  });

//Used for finding things in database
  /*const MongoClient2 = require('mongodb').MongoClient;
const uri2 = "mongodb+srv://VSC:528491@summer2020-qvltj.mongodb.net/BusinessCatalog?retryWrites=true&w=majority"
MongoClient2.connect(uri2, function(err, db) {
    if (err) throw err;
    var dbo = db.db("BusinessCatalog");
    const query = { address: "Neverland" };
    dbo.collection("logins").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });*/

