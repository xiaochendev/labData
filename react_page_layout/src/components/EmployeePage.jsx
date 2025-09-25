import Header from "./Header";
import CurrentEmployee from "./CurrentEmployee";

export default function EmployeePage({ employee }) {
  return (
    <div className="container">
      <Header title="Employee" />
      
      {employee ? (
        <CurrentEmployee {...employee} />
      ) : (
        <img src={"https://cdn.dribbble.com/userupload/41997079/file/original-51d12350ed3a27fd9ee1f71d4b935676.gif"} width={'200px'} />
      )}
    </div>
  );
}