// Instructors Route
// Requiring Express
const express = require ('express');

// Initializing Express Server Application
const instructorsRouter = express.Router();

// instructors database
const instructors = require('../data/instructors.js');

// -------------------------------  instructors Routes

//instructors main route
instructorsRouter.route("/")
    // GET the instructors Database
    .get((req,res) => {
        // res.json(instructors)
        // Looping through the instructors database.
        const instructorsHtml = instructors.map(instructor => `
            <div>
                <h3 style="color:orange">${instructor.name}</h3>
                <p style="color:wheat">ID : ${instructor.id}</p>
                <p style="color:wheat">Phone: ${instructor.phone}</p>
                <p style="color:wheat">Email: ${instructor.email}</p>
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
                    <h1 style="color:yellow; text-decoration:underline">Instructors List</h1>
                    ${instructorsHtml}
                </body>
            </html>
        `);
        
    })
    // POST in the instructors Database
    .post((req,res) => {
        
        if (req.body.name && req.body.phone && req.body.email) {
            // Checking for duplicates
            if (instructors.find((instructor) => instructor.name == req.body.name)) {
                res.send(`<h3 style="color:darkred">Student already exist</h3>`);
                return;
            }
            // If not exist creating a new object to the instructor
            const instructor = {
                id: instructors[instructors.length - 1].id + 1, // New Student ID
                name: req.body.name, // New instructor name
                phone: req.body.phone, // New instructor phone number
                email: req.body.email // New instructor email address
            };
            instructors.push(instructor); // Adding the new instructor object to the instructors array.
            res.json(instructors[instructors.length - 1]); // Returning a JSON response with the new instructor information.
        }
        else res.send(`<h3 style="color:darkred">ERROR: Incorrect Data</h3>`);
    })
// Student Routes Using Route Params
instructorsRouter.route('/:id')
    .get((req,res, next) => {
        const instructor = instructors.find((instructor)=> instructor.id == req.params.id);
        if (instructor) {
            res.json(instructor);
        } else {
            next();
        }
    })
    // Updating the user data using the id number in the url 
    .patch((req,res,next) => {
        const instructor = instructors.find((instructor,index) => {
            if (instructor.id == req.params.id) {
                for (const key in req.body) {
                    instructors[index][key] = req.body[key];
                }
                return true
            }
        });
        if (instructor) {
            res.json(instructor);
        } else {
            next();
        }
    })
    // Deleting a instructor
    .delete((req, res, next) => {
        const instructor = instructors.find((instructor, index) => {
          if (instructor.id == req.params.id) {
            instructors.splice(index, 1); // splicing from the arrayy.
            return true;
          }
        });
    
        if (instructor) res.json(instructor);
        else next();
      });

// Exporting the Routes
module.exports = instructorsRouter;

