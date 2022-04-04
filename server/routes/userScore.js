
const express = require("express");
const multer = require("multer");
const upload = multer();
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const scoreRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


scoreRoutes.route("/userScore/add").post(upload.any(),function (req, response) {
    let db_connect = dbo.getDb("CardGame");
    const formData = req.body;
    console.log(formData);
    let myobj = {
      userId: ObjectId(req.body._id),
      score: parseInt(req.body.score),
      date: new Date(),
    };
    db_connect.collection("ScoreBoard").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });



  module.exports = scoreRoutes;