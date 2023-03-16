import { useState } from "react";
import { Link } from "react-router-dom";

export default function RecoverPassowrd() {
  const [email, setEmail] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    alert(email);
  }
  return (
    <div className="auth-page">
      <h1>Recover</h1>
      <form onSubmit={(event) => onSubmit(event)}>
        <input
          placeholder="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <button>Recover Account</button>
      </form>
      <br />
      <Link to="/login">Go back to Login</Link>
    </div>
  );
}
