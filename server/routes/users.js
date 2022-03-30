const express = require("express");
const multer = require("multer");
const upload = multer();
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// returns array of all user objects
recordRoutes.route("/users").get(function (req, res) {
  let db_connect = dbo.getDb("CardGame");
  db_connect
    .collection("Users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      // This stop it from pulling it every second
      const results = res.json(result);
      // db_connect.close();
      return results;
    });
});

// joins the mongodb score to user
recordRoutes.route("/userscore").get(function (req, res) {
  let db_connect = dbo.getDb("CardGame");
  db_connect
    .collection("Users")
    .aggregate([{
        $lookup: {
          from: "ScoreBoard",
          localField: "userId",
          foreignField: "userId",
          as: "score"
        }
      }])
    .toArray(function (err, result) {
      if (err) throw err;
      const results = res.json(result);
      return results;
    });
});

// returns single user object by userId
recordRoutes.route("/users/:id").get(function (req, res) {
  let db_connect = dbo.getDb("CardGame");
  let myquery = { userId: parseInt(req.params.id) };
  db_connect
    .collection("Users")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you create a new record.
recordRoutes.route("/users/add").post(upload.any(),function (req, response) {
  let db_connect = dbo.getDb("CardGame");
  const formData = req.body;
  console.log(formData);
  let myobj = {
    userName: req.body.person_name,
    profilePic: req.body.profile_pic,

  };
  db_connect.collection("Users").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb("CardGame");
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      person_name: req.body.person_name,
      person_position: req.body.person_position,
      person_level: req.body.person_level,
    },
  };
  db_connect
    .collection("Users")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb("CardGame");
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("Users").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;