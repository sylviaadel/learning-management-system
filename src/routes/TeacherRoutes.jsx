import { Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";
import CourseDetails from "../pages/CourseDetails";

//good
export default function TeacherRoutes() {
  const name = "courses";
  const path = "/courses/:id";

  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path={path} element={<CourseDetails collection={name} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
