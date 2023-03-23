import { Link } from "react-router-dom";
import { heroText } from "../../scripts/helpers";

export default function Hero() {
  return (
    <section className="Hero">
      <h1>Do you want to learn how to be a Fashion Icon?</h1>
      <p>{heroText}</p>
      <div>
        <Link to="/sign-up" className="primary-btn">
          Join Us Now
        </Link>
        <Link to="/login" className="link-btn">
          login to your account
        </Link>
      </div>
    </section>
  );
}
