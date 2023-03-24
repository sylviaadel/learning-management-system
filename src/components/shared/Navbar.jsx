import logo from "../../assets/images/logo.png";
import { useUser } from "../../state/UsersProvider";
import { useNavigate } from "react-router";
import navLinks from "../../data/navLinks.json";
import { Link } from "react-router-dom";
import NavbarLink from "../navbar/NavbarLink";
import InfoPopup from "../modal/InfoPopup";
import Modal from "../modal/Modal";
import { useState } from "react";
import { logoAlt } from "../../scripts/helpers";
import { logoutInfo } from "../../scripts/helpers";

export default function Navbar() {
  const navigate = useNavigate();
  const { uid, setUid, saveUID } = useUser();
  const [modal, setModal] = useState(null);
  const popup = (
    <InfoPopup setModal={setModal} onClose={logoutUser} item={logoutInfo} />
  );

  function logoutUser() {
    setUid("");
    saveUID("");
    navigate("/");
  }
  function onChange() {
    if (uid) {
      setModal(popup);
    } else {
      navigate("/login");
    }
  }

  const Links = navLinks.map((item) => (
    <NavbarLink key={item.title} item={item} />
  ));

  return (
    <nav id="Navbar">
      <ul>
        <li>
          <Link to="/">
            <img src={logo} alt={logoAlt} />
            <span className="link-text">Threads & Trends</span>
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
