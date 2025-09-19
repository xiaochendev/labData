export default function EmployeeListItem({ firstName, lastName, jobTitle }) {

    let style = {
        border: '3px solid gray',
        borderRadius: '15px',
    }


  return (
    <li style={style}>
      <h3>
        {firstName} {lastName}
      </h3>
      <h4>{jobTitle}</h4>
    </li>
  );
}