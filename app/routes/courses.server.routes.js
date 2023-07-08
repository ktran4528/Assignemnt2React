//Load the index controller
const index = require('../../app/controllers/index.server.controller');
// Load the 'courses' controller
const courses = require('../controllers/courses.server.controller');

const express = require('express');

const cookieParser = require('cookie-parser');

// Define the routes module' method
module.exports = function (app) {
    // Set up the 'courses' base routes
    //
    //show the 'index' page if a GET request is made to root
    app.route('/').get(index.render);

    app.use(cookieParser());
    
    // a post request to /courses will execute createCourse method in courses.server.controller
    app.route('/courses').post(courses.createCourse);
    
    // a get request to /courses will execute list method in courses.server.controller
    app.get("/courses",courses.list); //go to http://localhost:3000/courses to see the list
    //
    // Set up the 'courses' parameterized routes 
    app.route('/courses/:chatId')
    .get(courses.read)
    .put(courses.update)
    .delete(courses.delete)
    // Set up the 'chatId' parameter middleware
    // All param callbacks will be called before any handler of 
    // any route in which the param occurs, and they will each 
    // be called only once in a request - response cycle, 
    // even if the parameter is matched in multiple routes
    // Here, courseByID will be called first, then read, update, or delete methods
    app.param('courseCode', courses.courseByID);

    
};
