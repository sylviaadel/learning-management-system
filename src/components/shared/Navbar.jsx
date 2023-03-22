import logo from "../../assets/images/logo.png";
import { useUser } from "../../state/UsersProvider";
import { useNavigate } from "react-router";
import navLinks from "../../data/navLinks.json";
import { Link } from "react-router-dom";
import NavbarLink from "../navbar/NavbarLink";
import InfoPopup from "../modal/InfoPopup";
import Modal from "../modal/Modal";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { uid, setUid, saveUID } = useUser();
  const [modal, setModal] = useState(null);
  const logoAlt = "A mannequin with red dress and a pen beside it";

  function logoutUser() {
    setUid("");
    saveUID("");
    navigate("/");
  }

  const item = {
    title: "Confirmation",
    message: "Are you sure you want to logout?",
    btnTitle: "Logout",
  };
  function onChange() {
    if (uid) {
      setModal(
        <InfoPopup setModal={setModal} onClose={logoutUser} item={item} />
      );
    } else {
      navigate("/login");
    }
  }

  const Links = navLinks.map((item) => (
    <NavbarLink key={item.title} item={item} />
  ));

  return (
    <nav id="Navbar">
      <ul id="Navbar">
        <li>
          <Link to="/">
            <img src={logo} alt={logoAlt} />
            <span className="link-text">Fabric Dreem</span>
          </Link>
        </li>
        {Links}
        <li className="login-btn" onClick={() => onChange()}>
          <i className="fa-solid fa-user"></i>
          <span className="link-text">{uid ? "Logout" : "Login"}</span>
        </li>
        <li className="expand-btn">
          <i className="fa-solid fa-angles-right"></i>
        </li>
      </ul>
      <Modal state={[modal, setModal]} />
    </nav>
  );
}
