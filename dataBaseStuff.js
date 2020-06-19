const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://VSC:528491@summer2020-qvltj.mongodb.net/BusinessCatalog?retryWrites=true&w=majority";
const bcrypt = require("bcrypt");
const saltRounds = 10;
const plainTextPassword1 = "opensesame";
//Used for hashing passwords
bcrypt
  .genSalt(saltRounds)
  .then(salt => {
    console.log(`Salt: ${salt}`);

    return bcrypt.hash(plainTextPassword1, salt);
  })
  .then(hash => {
    console.log(`Hash: ${hash}`);

    // Store hash in your password DB.
  })
  .catch(err => console.error(err.message));


//Used for inserting into database
MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  var dbo = db.db("BusinessCatalog");
  bcrypt
  .genSalt(saltRounds)
  .then(salt => {
    console.log(`Salt: ${salt}`);

    return bcrypt.hash(plainTextPassword1, salt);
  })
  .then(hash => {
    var word = hash;
    console.log(word);
    var myobj = { username: "Samir Desai", password: word, address: "Neverland", BusinessName: "Boosh Bukner", BusinessType: "Shelter", Description: "Some description", 
    Catalog: [{"Eggo Waffles": "$2.95" }, {"La Croix - 12 pack": "$4.00"}, {"Bread": "$2.00"}]};
    dbo.collection("logins").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      });
      db.close();
  })
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




