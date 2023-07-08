// Load the 'Ai' Mongoose model
var Course = require('mongoose').model('Course');
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
    // Create a new Ai
    exports.createCourse = function (req, res, next) {
        // Create a new instance of the 'Ai' Mongoose model
        var course = new Course(req.body); //get data from React form
        console.log("body: " + req.body.prompt);
    
        // Use the 'Ai' instance's 'save' method to save a new ai document
        course.save().then( () => {res.json(course);} ).catch(  
            (err) => {return next(err);} ); 
        };
            
    //
    // Returns all ais
    exports.list = function (req, res, next) {
        // Use the 'Ai' static's 'find' method to retrieve a new Ai document
        Course.find({}).then( (courses) => {res.json(courses);} ).catch( 
            (err) => {return next(err);} );  
    };
            
    //
    //'read' controller method to display a ai
    exports.read = function(req, res) {
        // Use the 'response' object to send a JSON response
        res.json(req.course);
    };
    //
    // 'aiByID' controller method to find a ai by its id
    exports.courseByID = function (req, res, next, id) {
        // Use the 'ai' static 'findOne' method to retrieve a specific a ai
        Course.findOne({_id: id } ).then((course) => {
       
      // Set the 'req.ai' property
      req.course = course;
      console.log(course);
      // Call the next middleware
      next();
  }).catch((err) => { // catch errors
 
      // Call the next middleware with an error message
      return next(err);
});
};

//update a ai by id
exports.update = function(req, res, next) {
console.log(req.body);
Course.findByIdAndUpdate(req.course.id, req.body).then(
  (course) =>{res.json(course);}).catch( 
      (err) =>{
      console.log(err);
      return next(err);
  });       

};
//
// delete a ai by id
exports.delete = function(req, res, next) {
console.log('in delete:',req.course.id, req.body)
Course.findByIdAndRemove(req.course.id, req.body).then(
  (course)=>{res.json(course);} 
  ).catch( (err) =>{
return next(err);      
});
};
//

