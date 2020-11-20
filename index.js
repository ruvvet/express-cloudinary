// DEPENDENCIES
require("dotenv").config();

const express = require('express');
const ejsLayouts = require('express-ejs-layouts');

const multer = require('multer');
const cloudinary = require('cloudinary');

// APP
const app = express();

// PORT
const PORT = process.env.PORT || 3000;

//MIDDLEWARE
app.set('view engine', 'ejs');
app.use(ejsLayouts);
const uploads = multer({ dest: './uploads' });

// ROUTES
app.get('/', function (req, res) {
  res.render('index');
});


// POST route
// doesnt need api key

app.post('/', uploads.single('inputFile'), (req, res) => {

  // get an input from user
  // this if from the req.file info that is passed fro the req
  let file = req.file.path;
  console.log(file);

  // then use the to redner the file on the page
  cloudinary.uploader.upload(file, (result) => {
    console.log(result);

    //Render result page with image
    res.render('result', { image: result.url });

  })
})



// LISTEN
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
