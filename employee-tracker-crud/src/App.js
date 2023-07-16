import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.log('Error fetching employees:', error));
  });

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
      </div>
    </div>
  );
}

export default App;
