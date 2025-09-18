import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import EmployeeList from '../components/EmployeeList';
import employeesData from "../components/Employees";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employeesData.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="homepage">
      <Header title="Employee Directory" />
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <EmployeeList employees={filteredEmployees} />
    </div>
  );
};

export default HomePage;
