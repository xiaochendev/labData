import EmployeeListItem from "./EmployeeListItem";
import employeeListData from "../utilities/employeeData.mjs";

export default function EmployeeList({ setCurrent }) {
  let style = {
    listStyle: "none",
    margin: "0",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };

  let loadedList = employeeListData.map((emp) => {
    return <EmployeeListItem setCurrent={setCurrent} emp={emp} key={emp.email} />;
  });

  return <ul style={style}>{loadedList}</ul>;
}