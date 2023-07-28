import React, { useState } from 'react';

function CreateEmployee({ onCreate }) {
  const [employeeData, setEmployeeData] = useState({
    first_name: '',
    last_name: '',
    age: '',
    years_of_employment: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(employeeData);

    setEmployeeData({
      first_name: '',
      last_name: '',
      age: '',
      years_of_employment: '',
      role: '',
    });
  };

  return (
    <form className="create_employee_form" onSubmit={handleSubmit}>
      <label className="form_label_container">
        First Name:
        <input
          type="text"
          name="first_name"
          value={employeeData.first_name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="form_label_container">
        Last Name:
        <input
          type="text"
          name="last_name"
          value={employeeData.last_name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="form_label_container">
        Age:
        <input
          type="text"
          name="age"
          value={employeeData.age}
          onChange={handleChange}
          required
        />
      </label>

      <label className="form_label_container">
        Years of Employment:
        <input
          type="text"
          name="years_of_employment"
          value={employeeData.years_of_employment}
          onChange={handleChange}
          required
        />
      </label>
      <label className="form_label_container">
        Role:
        <input
          type="text"
          name="role"
          value={employeeData.role}
          onChange={handleChange}
          required
        />
      </label>
      <button className="button-design" type="submit">
        Submit
      </button>
    </form>
  );
}

export default CreateEmployee;
