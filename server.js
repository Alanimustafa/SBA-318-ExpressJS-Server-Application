// Variables Declaration

// Requiring Express
const express = require ('express');

// Initializing Express Server Application
const app = express();

// Initializing Server PORT
const PORT = 3000;

// Import the body-parser package for data parsing.
const bodyParser = require("body-parser");

// Importing data from databases
const students = require ('./data/students');
const instructors = require ('./data/instructors');
const assistants = require ('./data/assistants');

// Using the Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));


//--------------- Routes ------------------------------

// Home Page
app.get ('/', (req, res) => {
    res.send(`
        <h1>Class Contact</h1>
        `);
});


//Students Routes
app.route("/students")
    // GET the Students Database
    .get((req,res) => {
        res.json(students)
    })
    // POST in the Students Database
    .post((req,res) => {
        
        if (req.body.name && req.body.phone && req.body.email) {
            // Checking for duplicates
            if (students.find((student) => student.name == req.body.name)) {
                res.send(`<h3 style="color:darkred">Student already exist</h3>`);
                return;
            }
            // If not exist creating a new object to the student
            const student = {
                id: students[students.length - 1].id + 1, // New Student ID
                name: req.body.name, // New student name
                phone: req.body.phone, // New student phone number
                email: req.body.email // New student email address
            };
            students.push(student); // Adding the new student object to the students array.
            res.json(students[students.length - 1]); // Returning a JSON response with the new student information.
        }
        else res.send(`<h3 style="color:darred">ERROR: Incorrect Data</h3>`);
    })


//Students Routes
app.get("/students", (req,res) => {
    res.json(students);
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