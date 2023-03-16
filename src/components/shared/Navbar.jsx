import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useUser } from "../../state/UserState";

export default function Navbar() {
  const { setUid, saveUID } = useUser();
  const logoAlt = "A mannequin with red dress and a pen beside it";

  function onLogout() {
    setUid("");
    saveUID("");
  }

  return (
    <nav id="Navbar">
      <ul>
        <li>
          <img src={logo} alt={logoAlt} />
          <span className="link-text">Fabric Dreem</span>
        </li>
        <li>
          <FontAwesomeIcon icon={solid("calendar-days")} />
          <span className="link-text">Check Calendar</span>
        </li>
        <li>
          <FontAwesomeIcon icon={brands("slack")} />
          <span className="link-text">Open in Slack</span>
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
