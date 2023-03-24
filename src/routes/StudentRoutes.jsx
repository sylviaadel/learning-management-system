import { Routes, Route } from "react-router-dom";
import CourseDetails from "../pages/CourseDetails";
import ViewCourses from "../pages/ViewCourses";
import NotFound from "../pages/NotFound";
import InvalidUser from "../pages/InvalidUser";

export default function StudentRoutes() {
  const name = "courses";
  const path = "/courses/:id";

  return (
    <Routes>
      <Route path="/" element={<ViewCourses collection={name} />} />
      <Route path="/courses" element={<ViewCourses collection={name} />} />
      <Route path={path} element={<CourseDetails collection={name} />} />
      <Route path="/deleted" element={<InvalidUser />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
