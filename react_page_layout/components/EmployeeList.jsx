import React from 'react';
import EmployeeListItem from './EmployeeListItem';

const EmployeeList = ({ employees }) => {
  return (
    <div className="employee-list">
      {employees.map((employee) => (
        <EmployeeListItem key={employee.id} employee={employee} />
      ))}
    </div>
  );
};

export default EmployeeList;
