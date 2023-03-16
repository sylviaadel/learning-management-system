import { Routes, Route } from "react-router-dom";
import Secret from "../pages/SecretPage";

export default function LoggedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Secret />} />
      <Route path="/secret-page" element={<Secret />} />
    </Routes>
  );
}
