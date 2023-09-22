

import React from 'react'
import empAPI from './AllEmployees'


export default function EmployeeList() {

      var empList=  empAPI.getAllEmps()

  return (
    <div>

        <h1>All Employees List</h1>
        {
            //map(): it iterates thorugh every element of an array
            //while iterating it allows us to modify that element
            //and return new value
            // in every iteration we will get emp object
            //while returning we have to to convert it to HTML element

           

            empList.map((emp)=><p key={emp.empid}>

                {emp.empid} &nbsp;&nbsp; {emp.empName}&nbsp;&nbsp;{emp.empSalary}
            </p>)
        }
        {/* <Outlet/> */}
    </div>
  )
}
