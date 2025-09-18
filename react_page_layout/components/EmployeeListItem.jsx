import React from 'react';

const EmployeeListItem = ({ employee }) => {
  return (
    <div className="employee-list-item">
      <img src={employee.avatar} alt={employee.name} />
      <div className="info">
        <div className="name">{employee.name}</div>
        <div className="title">{employee.title}</div>
      </div>
    </div>
  );
};

export default EmployeeListItem;
