const port = 3001
// const path = require('path')
// const publicPath = path.join(__dirname, '..', 'public')
const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
require('dotenv').config()

 app.use(cors())
 app.use(express.json())

 const db = mysql.createPool({
    connectionLimit:100,
    waitForConnections:true,
    queueLimit:0,
    user:'b8273682ee6959',
    host:'eu-cdbr-west-03.cleardb.net',
    password:'d3667532',
    database:'heroku_260d35baf029992',
    debug:true,
    wait_timeout:28800,
    connect_timeout:10
 })

//  mysql://b8273682ee6959:d3667532@eu-cdbr-west-03.cleardb.net/heroku_260d35baf029992?reconnect=true

 app.post("/update_employees", (req, res) => {
    const employee_firstName = req.body.firstName;
    const employee_lastName = req.body.lastName;
    const position = req.body.position;
    const shift = req.body.shift;
    const employee_salary = req.body.employee_salary;
    const employment_date = req.body.employment_date

    db.query('INSERT into employees_list (employee_firstName, employee_lastName, position, shift, employee_salary, employment_date) VALUES (?, ?, ?, ?, ?, ?)',
    [employee_firstName, employee_lastName, position, shift, employee_salary, employment_date],
    (err) => {
        if(err){
            console.log(err)
        }
        else{
            res.send("succesfully posted")
        }
    })
 })

 app.get("/get_employeeInfo", (req, res) => {
    db.query("SELECT * FROM employees_list", (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
 })

 app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM employees_list WHERE id = ?", id, (err, result) => { 
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
 })

app.listen(process.env.PORT || 3002, () => {
    console.log("server started on " + port)
})