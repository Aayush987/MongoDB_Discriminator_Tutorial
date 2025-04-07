const mongoose = require('mongoose');
const Base = require('./BaseSchema');


const EmployeeSchema = new mongoose.Schema({
    salary: {
        type: Number,
        required: true,
    },
    desig: {
        type: String,
        required: true,
    }
})

const Employee = Base.discriminator('Employee', EmployeeSchema);

module.exports = Employee;