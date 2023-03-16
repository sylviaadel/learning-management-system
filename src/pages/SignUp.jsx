import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="auth-page">
      <h1>Signup</h1>
      <form>
        <input placeholder="email" type="email" />
        <br />
        <input placeholder="password" type="password" />
        <br />
        <button>Sign Up</button>
      </form>
      <br />
      <Link to="/login">Login Instead</Link>
    </div>
  );
}
