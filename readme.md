SBA 318: Express Server Application
```````````````````````````````````

Note: * .gitignore * files has been created to remove node_modules package from Git tracking.

Introduction
````````````
The server application (app) is managing three modules:
1. Students.
2. Instructors.
3. Assistants.
Each database consists of three members. Each member has the following data:
1. Full name.
2. Phone number.
3. Email address.

Routes
``````
A. Home (/).
B. Students (/students)
C. Instructors (/Instructors)
D. Assistants (/assistants)




FOR TEST:
`````````
Below some JSON objects ready to copy and paste for POST requests

New student: (copy then paste)

{
    "name" : "Mustafa Alani",
    "phone" : "1232345",
    "email" : "mustafa@sba.sba"
}



HOW IT WORKS
````````````
For GET:
    - main (/)
    - By parameter (ex:  /student/1)
For Delete : use the id number at the end of the url of the selected category.
for Patch: use the id number at the end of the url of the selected category and pass the desired JSON object.
