import { useState } from "react";
import { Link } from "react-router-dom";
import { recoverAccount } from "../scripts/auth";

export default function RecoverPassowrd() {
  const [email, setEmail] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const result = await recoverAccount(email);
    result.status ? onSuccess(result) : onFailure(result);
  }

  function onSuccess(result) {
    const message =
      "Email with a reset link sent. Please check your SPAM/Junk folder as well.";
    alert(message);
  }

  function onFailure(result) {
    alert(result.message);
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
