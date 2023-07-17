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

  const handlePatch = (employee) => {};
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
        {employees.map((employee) => {
          return (
            <ul key={employee.id}>
              <li>{employee.first_name}</li>
              <li>{employee.last_name}</li>
              <li>{employee.age}</li>
              <li>{employee.years_of_employment}</li>
            </ul>
          );
        })}
        <EmployeeTable
          employees={employees}
          onDelete={handleDelete}
          onPatch={handlePatch}
        />
      </div>
    </div>
  );
}

export default App;
