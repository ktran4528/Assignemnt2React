var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CourseSchema = new Schema({


    courseCode: { type: String, unique: true, required: true },
    section: String,
    semester: Number,
    students: [{type: Schema.Types.ObjectId, ref: 'Student'}],
 

});
mongoose.model('Course', CoursetSchema);
