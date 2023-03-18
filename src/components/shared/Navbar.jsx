import logo from "../../assets/images/logo.png";
import { useUser } from "../../state/UserProvider";
import { useNavigate } from "react-router";
import navLinks from "../../data/navLinks.json";

export default function Navbar() {
  const navigate = useNavigate();
  const { setUid, saveUID } = useUser();
  const logoAlt = "A mannequin with red dress and a pen beside it";

  function onLogout() {
    setUid("");
    saveUID("");
    navigate("/");
  }

  const Links = navLinks.map((item) => (
    <li key={item.title}>
      <a href={item.link} target="_blank">
        <i className={item.icon}></i>
        <span className="link-text">{item.title}</span>
      </a>
    </li>
  ));

  return (
    <nav id="Navbar">
      <ul>
        <li>
          <img src={logo} alt={logoAlt} />
          <span className="link-text">Fabric Dreem</span>
        </li>
        {Links}
        <li className="login-btn" onClick={() => onLogout()}>
          <i className="fa-solid fa-user"></i>
          <span className="link-text">Logout</span>
        </li>
        <li className="expand-btn">
          <i className="fa-solid fa-angles-right"></i>
        </li>
      </ul>
    </nav>
  );
}
