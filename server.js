// Variables Declaration

// Requiring Express
const express = require ('express');

// Initializing Express Server Application
const app = express();

// Initializing Server PORT
const PORT = 3000;

// Parsing the data
const bodyParser = require("body-parser");

// Importing data from databases
const students = require ('./data/students');
const instructors = require ('./data/instructors');
const assistants = require ('./data/assistants');


//--------------- Routes ------------------------------

// Home Page
app.get ('/', (req, res) => {
    res.send(`
        <h1>Class Contact</h1>
        `);
});



// (404) Error Middleware { error: "Resource Not Found" }
app.use((req, res) => {
    res.status(404);
    res.send(`
        <h2 style="color:red">Error: 400 Page Not Found</h2>
        `);
  });


//--------------- Starting the Server --------------------
// Starting the Server to PORT 3000
app.listen(PORT, (req, res) => {
    console.log(`Server APP started at port# ${PORT}`);
})