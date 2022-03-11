const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/users"));
// get driver connection
const dbo = require("./db/conn");
//multer needed for profile pic uploading
const multer = require("multer");
const upload = multer({dest: "./uploads"})

app.listen(port, () => {
    // perform a database connection when server starts
    dbo.connectToServer(function (err) {
        if (err) console.error(err);

    });
    console.log(`Server is running on port: ${port}`);
}); 


//used for the user uploading profile pics
app.post('/uploads', upload.single("profilePic"), function(req, res) {
    console.log(req.file.profilePic); // the uploaded file object
  });