export default function CurrentEmployee({
  firstName,
  lastName,
  jobTitle,
  officeNum,
  mobileNum,
  SMS,
  email,
}) {
  return (
    <div>
      <h3>
        {firstName} {lastName}
      </h3>
      <h4>{jobTitle}</h4>
      <div>
        <h5>Call Office</h5>
        <p>{officeNum}</p>
      </div>
      <div>
        <h5>Call Mobile</h5>
        <p>{mobileNum}</p>
      </div>
      <div>
        <h5>SMS</h5>
        <p>{SMS}</p>
      </div>
      <div>
        <h5>Email</h5>
        <p>{email}</p>
      </div>
    </div>
  );
}