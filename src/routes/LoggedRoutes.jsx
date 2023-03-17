import { Routes, Route } from "react-router-dom";
import ViewCourses from "../pages/ViewCourses";

export default function LoggedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ViewCourses />} />
      <Route path="/view-courses" element={<ViewCourses />} />
    </Routes>
  );
}
