// Students Route
// Requiring Express
const express = require ('express');

// Initializing Express Server Application
const studentRouter = express.Router();

// Students database
const students = require('../data/students.js');

// -------------------------------  Students Routes

//Students main route
studentRouter.route("/")
    // GET the Students Database
    .get((req,res) => {
        // res.json(students)
        // Looping through the students database.
        const studentsHtml = students.map(student => `
            <div>
                <h3 style="color:orange">${student.name}</h3>
                <p style="color:wheat">ID : ${student.id}</p>
                <p style="color:wheat">Phone: ${student.phone}</p>
                <p style="color:wheat">Email: ${student.email}</p>
                <br>
            </div>
        `).join(""); // Join the array of HTML strings into one string

        // Send the generated HTML as the response
        res.send(`
            <html>
                <head>
                    <link rel="stylesheet" href="./public/style.css"/> 
                </head>
                <body style="background-color:#333f3c">
                    <h1 style="color:yellow; text-decoration:underline">Student List</h1>
                    ${studentsHtml}
                </body>
            </html>
        `);
        
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
        else res.send(`<h3 style="color:darkred">ERROR: Incorrect Data</h3>`);
    })
// Student Routes Using Route Params
studentRouter.route('/:id')
    .get((req,res, next) => {
        const student = students.find((student)=> student.id == req.params.id);
        if (student) {
            res.json(student);
        } else {
            next();
        }
    })
    // Updating the user data using the id number in the url 
    .patch((req,res,next) => {
        const student = students.find((student,index) => {
            if (student.id == req.params.id) {
                for (const key in req.body) {
                    students[index][key] = req.body[key];
                }
                return true
            }
        });
        if (student) {
            res.json(student);
        } else {
            next();
        }
    })
    // Deleting a student
    .delete((req, res, next) => {
        const student = students.find((student, index) => {
          if (student.id == req.params.id) {
            students.splice(index, 1); // splicing from the arrayy.
            return true;
          }
        });
    
        if (student) res.json(student);
        else next();
      });

// Exporting the Routes
module.exports = studentRouter;

