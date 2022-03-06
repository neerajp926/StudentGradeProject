const express = require("express");
const { append } = require("express/lib/response");
const dbManager = require("./dbManager");
const PORT = 3000
const app = express()

app.listen(PORT, ()=> console.info('listening to port ' + PORT))

app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/students', (req, res) => {
    dbManager.getStudents()
    .then(
        result => {
            console.dir(result)
            res.json(result)
        }
    )
    .catch( err => res.send(`fetch error ${err}`))
})


app.get('/getStudentById/:id', (req, res) => {
    dbManager.getStudentById(req.params.id)
    .then(
        result => {
            console.dir(result)
            res.json(result)
        }
    )
    .catch( err => res.send(`fetch error ${err}`))
})

dbManager.getStudents()

 //dbManager.getStudentById()        // will throw error as student id is required 
 dbManager.getStudentById(2)       // fetch the student whose id is 1

 dbManager.deleteStudentById(1002); // delete student entry by student id 
 //dbManager.deleteStudentById()      // will throw error as student id is required 

// // Pass parameter as first_name, middle_name, last_name, date_of_birth, gender
 dbManager.insertStudent('Kim','','Kardashian','01/01/2020', 'f')

// pass student ID, and other parameter to update
dbManager.updateStudentById(2,'Neearj','','Patel','01/03/1997',"M")