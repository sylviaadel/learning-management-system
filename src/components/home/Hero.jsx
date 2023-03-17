import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="Hero">
      <h1>Do you want to learn how to be a Fashion Icon?</h1>
      <p>
        Be your own personal styler, Master your image boost your confidence!
        You Can Be Stylish, Have Confidence, and Feel Radiant everyday, all you
        need is to know how.
      </p>
      <Link to="/login" className="primary-btn">
        Join Course
      </Link>
    </section>
  );
}
