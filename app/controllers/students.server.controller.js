// Load the 'Student' Mongoose model
var Student = require('mongoose').model('Student');
//
// Create a new error handling controller method
const getErrorMessage = function(err) {
    // Define the error message variable
    var message = '';

    // If an internal MongoDB error occurs get the error message
    if (err.code) {
        switch (err.code) {
            // If a unique index error occurs set the message error
            case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                // If a general error occurs set the message error
                default:
                    message = 'Something went wrong';
            }
        } else {
            // Grab the first error message from a list of possible errors
            for (const errName in err.errors) {
                if (err.errors[errName].message) message = err.errors[errName].message;
            }
        }
    
        // Return the message error
        return message;
    };
    // Create a new Student
    exports.createStudent = function (req, res, next) {
        // Create a new instance of the 'Student' Mongoose model
        var student = new Student(req.body); //get data from React form
        console.log("body: " + req.body.prompt);
    
        // Use the 'Student' instance's 'save' method to save a new student document
        student.save().then( () => {res.json(student);} ).catch(  
            (err) => {return next(err);} ); 
        };
            
    //
    // Returns all students
    exports.list = function (req, res, next) {
        // Use the 'Student' static's 'find' method to retrieve a new Student document
        Student.find({}).then( (students) => {res.json(students);} ).catch( 
            (err) => {return next(err);} );  
    };
            
    //
    //'read' controller method to display a student
    exports.read = function(req, res) {
        // Use the 'response' object to send a JSON response
        res.json(req.student);
    };
    //
    // 'studentByID' controller method to find a student by its id
    exports.studentByID = function (req, res, next, id) {
        // Use the 'student' static 'findOne' method to retrieve a specific a student
        Student.findOne({_id: id } ).then((student) => {
       
      // Set the 'req.student' property
      req.student = student;
      console.log(student);
      // Call the next middleware
      next();
  }).catch((err) => { // catch errors
 
      // Call the next middleware with an error message
      return next(err);
});
};

//update a student by id
exports.update = function(req, res, next) {
console.log(req.body);
Student.findByIdAndUpdate(req.student.id, req.body).then(
  (student) =>{res.json(student);}).catch( 
      (err) =>{
      console.log(err);
      return next(err);
  });       

};
//
// delete a student by id
exports.delete = function(req, res, next) {
console.log('in delete:',req.student.id, req.body)
Student.findByIdAndRemove(req.student.id, req.body).then(
  (student)=>{res.json(student);} 
  ).catch( (err) =>{
return next(err);      
});
};
//

