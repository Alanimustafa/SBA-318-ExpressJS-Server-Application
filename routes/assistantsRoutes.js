// Assistats Route
// Requiring Express
const express = require ('express');

// Initializing Express Server Application
const assistantsRouter = express.Router();

// Assistats database
const assistants = require('../data/assistants.js');

// -------------------------------  Assistats Routes

//Assistats main route
assistantsRouter.route("/")
    // GET the Assistats Database
    .get((req,res) => {
        // res.json(assistants)
        // Looping through the assistants database.
        const assistantsHtml = assistants.map(assistant => `
            <div>
                <h3 style="color:orange">${assistant.name}</h3>
                <p style="color:wheat">ID : ${assistant.id}</p>
                <p style="color:wheat">Phone: ${assistant.phone}</p>
                <p style="color:wheat">Email: ${assistant.email}</p>
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
                    <h1 style="color:yellow; text-decoration:underline">Assistants List</h1>
                    ${assistantsHtml}
                </body>
            </html>
        `);
        
    })
    // POST in the Assistats Database
    .post((req,res) => {
        
        if (req.body.name && req.body.phone && req.body.email) {
            // Checking for duplicates
            if (assistants.find((assistant) => assistant.name == req.body.name)) {
                res.send(`<h3 style="color:darkred">Student already exist</h3>`);
                return;
            }
            // If not exist creating a new object to the assistant
            const assistant = {
                id: assistants[assistants.length - 1].id + 1, // New Student ID
                name: req.body.name, // New assistant name
                phone: req.body.phone, // New assistant phone number
                email: req.body.email // New assistant email address
            };
            assistants.push(assistant); // Adding the new assistant object to the assistants array.
            res.json(assistants[assistants.length - 1]); // Returning a JSON response with the new assistant information.
        }
        else res.send(`<h3 style="color:darkred">ERROR: Incorrect Data</h3>`);
    })
// Student Routes Using Route Params
assistantsRouter.route('/:id')
    .get((req,res, next) => {
        const assistant = assistants.find((assistant)=> assistant.id == req.params.id);
        if (assistant) {
            res.json(assistant);
        } else {
            next();
        }
    })
    // Updating the user data using the id number in the url 
    .patch((req,res,next) => {
        const assistant = assistants.find((assistant,index) => {
            if (assistant.id == req.params.id) {
                for (const key in req.body) {
                    assistants[index][key] = req.body[key];
                }
                return true
            }
        });
        if (assistant) {
            res.json(assistant);
        } else {
            next();
        }
    })
    // Deleting a assistant
    .delete((req, res, next) => {
        const assistant = assistants.find((assistant, index) => {
          if (assistant.id == req.params.id) {
            assistants.splice(index, 1); // splicing from the arrayy.
            return true;
          }
        });
    
        if (assistant) res.json(assistant);
        else next();
      });

// Exporting the Routes
module.exports = assistantsRouter;

