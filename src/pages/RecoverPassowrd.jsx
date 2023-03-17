import { useState } from "react";
import { Link } from "react-router-dom";
import { recoverAccount } from "../scripts/auth/recoverAccount";

export default function RecoverPassowrd() {
  const [email, setEmail] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const result = await recoverAccount(email);
    result.status ? onSuccess(result) : onFail(result);
  }

  function onSuccess(result) {
    const message =
      "Email with a reset link sent. Please check your SPAM/Junk folder as well.";
    alert(message);
  }

  function onFail(result) {
    alert(result.message);
  }

  return (
    <div className="auth-page">
      <h1>Recover Account</h1>
      <form onSubmit={(event) => onSubmit(event)}>
        <label>
          Email
          <input
            placeholder="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <button className="primary-btn">Recover Account</button>
      </form>
      <Link to="/login">Go back to Login</Link>
    </div>
  );
}
