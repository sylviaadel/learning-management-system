import { Link } from "react-router-dom";

export default function RecoverPassowrd() {
  return (
    <div className="auth-page">
      <h1>Recover</h1>
      <form>
        <input placeholder="email" type="email" />
        <br />
        <button>Recover Account</button>
      </form>
      <br />
      <Link to="/login">Go back to Login</Link>
    </div>
  );
}
