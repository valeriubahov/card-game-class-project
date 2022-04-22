const express = require("express");
const path = require('path');
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/users"));
app.use(require("./routes/userScore"));

// get driver connection
const dbo = require("./db/conn");

app.use(express.static(path.resolve(__dirname, "./build")));


//multer needed for profile pic uploading
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});


//used for the user uploading profile pics
app.post('/uploads', upload.single("profile_pic"), function (req, res) {
  // console.log("please",req.file.filename); // the uploaded file object
  let db_connect = dbo.getDb("CardGame");
  // const formData = req.body;
  // console.log(formData);
  // let myobj = {
  //   name: req.body.person_name,
  //   profilePic: req.body.profile_pic,

  // };
  //change below to update instead of insert
  // db_connect.collection("Users").insertOne(myobj, function (err, res) {
  //   if (err) throw err;
  //   response.json(res);
  // });
});