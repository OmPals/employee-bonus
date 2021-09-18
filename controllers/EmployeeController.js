const Employee = require('../models/Employee')

const CreateEmployee = async function (req, res, next) {
    try {
        let emp = await Employee.create(req.body);
        res.status(201).json(emp)
    }
    catch(ex) {
        next(ex);
    }
}

const RemoveEmployee = async function(req, res, next) {
    try {
        const id = req.params.id;
        Employee.findOneAndDelete({uniqueId: id}, function(err) {
            if(err) next(err)
        })
        res.sendStatus(204)
    }
    catch(ex) {
        next(ex)
    }
}

const GetEmployeesBonus = async function(req, res, next) {
    try {
        let emps = await Employee.find({}, 'uniqueId monthlySalary');
        emps = emps.map(x => { return { uniqueId: x.uniqueId, bonus: x.bonus } })
        res.status(200).json(emps);
    }
    catch(ex) {
        next(ex)
    }
}

module.exports = {
    CreateEmployee,
    RemoveEmployee,
    GetEmployeesBonus
}