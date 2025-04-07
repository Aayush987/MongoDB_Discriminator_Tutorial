const Student = require('../models/Student');
const Employee = require('../models/Employee');

exports.addStudent = async (req, res) => {
        const {name, gender, age, grade} = req.body;
    try {
        const student = await Student.create({name, gender, age, grade});
        res.json(student);
    }catch (error) {
        res.status(500).json({error: 'Failed to create Student'});
    }
};


exports.addEmployee = async (req, res) => {
    const {name, gender, age, salary, desig} = req.body;

    try {
         const employee = await Employee.create({name,gender,age,salary,desig});
         res.json(employee);
    }catch (error) {
        res.status(500).json({error: 'Failed to create Employee'});
        console.log(error);
    }
};


exports.getStudents = async (req, res) => {
    const students = await Student.find();
    res.json(students);
}

exports.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
}