import React from 'react'
import {Link, Route, Routes} from 'react-router-dom'
import EmployeeList from './EmployeeList'
import {HomeCOmponent}   from '../SimpleROuting'

export default function Header() {
  return (
    <div>

        <nav>
            <ul>
                <Link to="/" >Home</Link>
            </ul>

            <ul>
                <Link to="/employees" >Employees</Link>
            </ul>
        </nav>

        <Routes>

                <Route path="/" element={<HomeCOmponent/>}></Route>
            <Route path="/employees" element={<EmployeeList/>}></Route>
        </Routes>
    </div>
  )
}




