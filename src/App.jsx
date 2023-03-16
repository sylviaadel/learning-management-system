import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./styles/style.scss";
import Navbar from "./components/shared/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RecoverPassowrd from "./pages/RecoverPassowrd";
import SignUp from "./pages/SignUp";
import Secret from "./pages/SecretPage";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/recover-password" element={<RecoverPassowrd />} />
          <Route path="/secret-page" element={<Secret />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
