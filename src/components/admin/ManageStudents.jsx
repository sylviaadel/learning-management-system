import userGirl from "../../assets/images/user-girl.svg";

export default function ManageStudents() {
  return (
    <section>
      <div className="student-item">
        <button class="close">&times;</button>
        <img src={userGirl} alt="user" />
        <h3>Student Name</h3>
      </div>
      <div className="student-item">
        <button class="close">&times;</button>
        <img src={userGirl} alt="user" />
        <h3>Student Name</h3>
      </div>
    </section>
  );
}
