const express = require('express')
const router = express.Router()
const EmployeeController = require('../controllers/EmployeeController.js')
const authorize = require('../helpers/authorize')

router.get('/bonus', authorize(), EmployeeController.GetEmployeesBonus)
router.post('/', authorize(), EmployeeController.CreateEmployee)
router.delete('/:id', authorize(), EmployeeController.RemoveEmployee)
// router.post('/signup', AuthController.Register)

module.exports = router