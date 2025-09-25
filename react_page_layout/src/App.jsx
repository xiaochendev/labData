import "./App.css";
import { useState } from "react";
import data from './utilities/employeeData.mjs';

// Components
import HomePage from "./components/HomePage";
import EmployeePage from "./components/EmployeePage";

function App() {
  const [current, setCurrent] = useState(null);

  return (
    <main>
      <HomePage setCurrent={setCurrent} />
      <EmployeePage employee={current} />
    </main>
  );
}

export default App;