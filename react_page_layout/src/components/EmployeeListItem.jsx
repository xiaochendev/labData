export default function EmployeeListItem({ emp, setCurrent }) {

    let style = {
        border: '3px solid gray',
        borderRadius: '15px',
    }

    function handleClick(){
      setCurrent(emp);
    }


  return (
    <li onClick={handleClick} style={style}>
      <h3>
        {emp.firstName} {emp.lastName}
      </h3>
      <h4>{emp.jobTitle}</h4>
    </li>
  );
}