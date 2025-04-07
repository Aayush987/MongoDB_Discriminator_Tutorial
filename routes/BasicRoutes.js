const express = require('express');
const {addStudent, addEmployee, getStudents, getEmployees} = require('../controllers/BasicController');
const router = express.Router();

router.post('/student',addStudent);
router.post('/employee', addEmployee);
router.get('/getStudents', getStudents);
router.get('/getEmployees',getEmployees);



module.exports = router;