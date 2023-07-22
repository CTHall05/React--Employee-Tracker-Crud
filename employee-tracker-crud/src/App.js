import { useState, useEffect } from 'react';
import './App.css';
import EmployeeTable from './Componenets/EmployeeTable/EmployeeTable';

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.log('Error fetching employees:', error));
  });

  const promptForUpdatedData = (employee) => {
    const updatedData = {};

    updatedData.first_name = prompt(
      `Enter the updated first name for employee ${employee.id}:`,
      employee.first_name
    );

    updatedData.last_name = prompt(
      `Enter the updated last name for the employee ${employee.id}:`,
      employee.last_name
    );

    updatedData.age = parseInt(
      prompt(
        `Enter the updated age for employee ${employee.id}:`,
        employee.age
      ),
      10
    );
    updatedData.years_of_employment = parseInt(
      prompt(
        `Enter the updated years of employment for employee ${employee.id}:`,
        employee.years_of_employment
      ),
      10
    );

    updatedData.role = prompt(
      `Enter the updated role for the employee ${employee.id}:`,
      employee.last_name
    );

    return updatedData;
  };

  const handlePatch = (employee) => {
    // Prompt the user for updated data or use a form/modal to gather the updated data
    const updatedData = promptForUpdatedData(employee);

    // Send the PATCH request to update the employee on the server
    fetch(`http://localhost:3000/users/${employee.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((updatedEmployee) => {
        const updatedEmployees = employees.map((emp) => {
          if (emp.id === updatedEmployee.id) {
            return updatedEmployee;
          }
          return emp;
        });
        setEmployees(updatedEmployees);
      })
      .catch((error) => console.log('Error updating employee:', error));
  };

  // DELETE - handleDelete function to delete from database
  const handleDelete = (employeeId) => {
    fetch(`http://localhost:3000/users/${employeeId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedEmployee = employees.filter(
          (employee) => employee.id !== employeeId
        );
        setEmployees(updatedEmployee);
      })
      .catch((error) => console.log('Error delete employee:'));
  };

  // const [showForm, setShowForm] = useState(false);
  // const [employees, setEmployee] = useState([]);

  // const handleFormSubmit = (employeeData) => {
  //   // Send a POST request to the server to create the employee
  //   fetch('http://localhost:3000/users', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(employeeData),
  //   })
  //     .then((response) => response.json())
  //     .then((employeeData) => {});
  // };

  return (
    <div className="App">
      <header className="App-header">Employee Tracker</header>
      <div>
        <EmployeeTable
          className="table"
          employees={employees}
          onDelete={handleDelete}
          onPatch={handlePatch}
        />
      </div>
    </div>
  );
}

export default App;
