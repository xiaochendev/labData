import Header from "./Header";
import SearchBar from "./SearchBar";
import EmployeeList from "./EmployeeList";

export default function HomePage({ setCurrent }) {
  return (
    <div className="container">
      <Header title="Employee Directory" />
      <SearchBar />
      <EmployeeList setCurrent={setCurrent} />
    </div>
  );
}