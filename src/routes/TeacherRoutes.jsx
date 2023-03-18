import { Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";

export default function TeacherRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
