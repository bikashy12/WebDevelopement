const mongoose = require("mongoose");
const validator = require("validator");

const Employee = new mongoose.model(
  "Employee",
  {
    //Fill in the code here
    empid: { type: String },
    name: { type: String },
    role: { type: String },
    department: { type: String },
    salary: { type: Number },
    experience: { type: Number },
    awards: [],
  },
  "employees"
);

Employee.insertEmployee = function (new_employee) {
  //Fill in the code here
  return new Promise((resolve, reject) => {
    var newEmployee = new Employee(new_employee);
    newEmployee.save((err, doc) => {
      if (err) reject(err);
      else
        resolve({
          statusCode: 200,
          doc,
        });
    });
  });
};

Employee.getAll = function () {
  return new Promise((resolve, reject) => {
    Employee.find({}, (err, employeeList) => {
      if (err) {
        reject(err);
      } else {
        console.log(employeeList + " inside Models");
        resolve(employeeList);
      }
    });
  });
};

module.exports = Employee;
