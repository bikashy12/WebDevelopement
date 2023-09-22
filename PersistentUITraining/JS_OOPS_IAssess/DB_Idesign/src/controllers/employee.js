const { response } = require("express");
var EmployeeModel = require("../models/employee");

const EmployeeController = {};

EmployeeController.insertEmployee = (req, res, next) => {
  //Fill in the code
  EmployeeModel.insertEmployee(req.body)
    .then((response) => res.status(response.statusCode))
    .catch((err) => res.send(err));
};

EmployeeController.getAllEmployees = (req, res, next) => {
  //Fill in the code
  EmployeeModel.getAll()
    .then((employee) => {
      var employeeList = [];
      employeeList.push(employee);
      res.send(`<html><body>[${employeeList}]</body></html>`);
    })
    .catch((err) => res.send(err));
};

module.exports = EmployeeController;
