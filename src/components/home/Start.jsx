import startImg from "../../assets/images/start-img.png";
import { imgStartAlt, checkmarkIcon } from "../../scripts/helpers";

export default function Start() {
  return (
    <section className="start">
      <header>
        <h2>It is easy to start Learning</h2>
        <img src={startImg} alt={imgStartAlt} />
      </header>
      <ul>
        <li>{checkmarkIcon} Create Account</li>
        <li>{checkmarkIcon} Check all materials</li>
        <li>{checkmarkIcon} Communicate with instructors</li>
      </ul>
    </section>
  );
}
