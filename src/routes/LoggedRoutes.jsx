import StudentRoutes from "./StudentRoutes";
import TeacherRoutes from "./TeacherRoutes";

export default function LoggedRoutes(user) {
  return (
    <>
      {user.role === "teacher" && <TeacherRoutes />}
      {user.role === "student" && <StudentRoutes />}

      {/* // user.role = "admin" or user.roles = "teache" */}
      <p>Error user {user.role} does not exist</p>
    </>
  );
}
