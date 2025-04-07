const mongoose = require('mongoose');
const Base = require('./BaseSchema');

const StudentSchema = new mongoose.Schema({
    grade: {
        type: Number,
        required: true,
    },
});

const Student = Base.discriminator('Student', StudentSchema);

module.exports = Student;