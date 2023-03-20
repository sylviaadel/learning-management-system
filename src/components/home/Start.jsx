import startImg from "../../assets/images/start-img.png";
import checkmark from "../../assets/images/checkmark.png";

export default function Start() {
  const checkmarkIcon = <img src={checkmark} alt="pink Checkmark" />;

  return (
    <section className="start">
      <header>
        <h2>It is easy to start Learning</h2>
        <img
          src={startImg}
          alt="A girl holding graduation report and wearing graduation cap infront of laptop and books"
        />
      </header>
      <ul>
        <li>{checkmarkIcon} Create Account</li>
        <li>{checkmarkIcon} Check all materials</li>
        <li>{checkmarkIcon} Communicate with instructors</li>
      </ul>
    </section>
  );
}
