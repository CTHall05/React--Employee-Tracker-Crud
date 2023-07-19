import React from 'react';
import '../../App.css';

function EmployeeTable({ employees, onDelete, onPatch }) {
  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Years of Employment</th>
          <th>Role</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => {
          return (
            <tr key={employee.id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.age}</td>
              <td>{employee.years_of_employment}</td>
              <td>{employee.role}</td>
              <td>
                <button onClick={() => onPatch(employee)}>Edit</button>
              </td>
              <td>
                <button onClick={() => onDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
