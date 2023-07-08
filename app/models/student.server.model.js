var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StudentSchema = new Schema({

    studentNum: { type: String, unique: true, required: true },
    password: String,
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    phoneNum: String,
    email: String,
    program: String,
    favGame:String,
    favFruit:String,

});
mongoose.model('Student', StudentSchema);
