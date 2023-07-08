//Load the index controller
const index = require('../controllers/index.server.controller');
// Load the 'students' controller
const students = require('../controllers/students.server.controller');

const express = require('express');

const cookieParser = require('cookie-parser');

// Define the routes module' method
module.exports = function (app) {
    // Set up the 'students' base routes
    //
    //show the 'index' page if a GET request is made to root
    app.route('/').get(index.render);

    app.use(cookieParser());
    
    // a post request to /students will execute createStudent method in students.server.controller
    app.route('/students').post(students.createStudent);
    
    // a get request to /students will execute list method in students.server.controller
    app.get("/students",students.list); //go to http://localhost:3000/students to see the list
    //
    // Set up the 'students' parameterized routes 
    app.route('/students/:studentNum')
    .get(students.read)
    .put(students.update)
    .delete(students.delete)
    // Set up the 'chatId' parameter middleware
    // All param callbacks will be called before any handler of 
    // any route in which the param occurs, and they will each 
    // be called only once in a request - response cycle, 
    // even if the parameter is matched in multiple routes
    // Here, studentByID will be called first, then read, update, or delete methods
    app.param('studentNum', students.studentByID);

    
};
