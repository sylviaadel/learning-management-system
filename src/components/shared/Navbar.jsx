import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useUser } from "../../state/UserProvider";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  const { setUid, saveUID } = useUser();
  const logoAlt = "A mannequin with red dress and a pen beside it";

  function onLogout() {
    setUid("");
    saveUID("");
    navigate("/");
  }

  return (
    <nav id="Navbar">
      <ul>
        <li>
          <img src={logo} alt={logoAlt} />
          <span className="link-text">Fabric Dreem</span>
        </li>
        <li>
          <a href="https://calendar.google.com/calendar/u/0/r">
            <FontAwesomeIcon icon={solid("calendar-days")} />
            <span className="link-text">Check Calendar</span>
          </a>
        </li>
        <li>
          <a href="https://slack.com/">
            <FontAwesomeIcon icon={brands("slack")} />
            <span className="link-text">Open in Slack</span>
          </a>
        </li>
        <li className="login-btn" onClick={() => onLogout()}>
          <FontAwesomeIcon icon={solid("circle-user")} />
          <span className="link-text">Logout</span>
        </li>
        <li className="expand-btn">
          <FontAwesomeIcon icon={solid("angles-right")} />
        </li>
      </ul>
    </nav>
  );
}
