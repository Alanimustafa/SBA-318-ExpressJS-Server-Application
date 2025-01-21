// Requiring Express
const express = require ('express');

// Initializing Express Server Application
const app = express();

// Initializing Server PORT
const PORT = 3000;

// Parsing the data
const bodyParser = require("body-parser");


// Starting the Server to PORT 3000
app.listen(PORT, (req, res) => {
    console.log(`Server APP started at port# ${PORT}`);
})