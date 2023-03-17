import { Routes, Route } from "react-router-dom";
import CourseDetails from "../pages/CourseDetails";
import ViewCourses from "../pages/ViewCourses";
import NotFound from "../pages/NotFound";

export default function LoggedRoutes() {
  const name = "courses";
  const path = "/courses/:id";

  return (
    <Routes>
      <Route path="/" element={<ViewCourses collection={name} />} />
      <Route path="/courses" element={<ViewCourses collection={name} />} />
      <Route path={path} element={<CourseDetails collection={name} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
