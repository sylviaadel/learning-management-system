import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../scripts/auth/createAccount";
import { useUser } from "../state/UserProvider";

export default function SignUp() {
  const navigate = useNavigate();
  const { setUid, saveUID } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    const result = await createAccount(email, password);
    result.status ? onSuccess(result) : onFail(result);
  }

  function onSuccess(result) {
    if (remember) {
      saveUID(result.payload);
    }
    setUid(result.payload);
    navigate("/courses");
  }

  function onFail(result) {
    alert(result.message);
  }

  return (
    <div className="auth-page">
      <h1>Create a new Account</h1>
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
        <label>
          Password
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <span className="remember-me">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          Remember Me
        </span>
        <button className="primary-btn">Sign Up</button>
      </form>
      <Link to="/login">Already have an account</Link>
    </div>
  );
}
