import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../state/UsersProvider";
import { login } from "../scripts/auth/login";

export default function Login() {
  const navigate = useNavigate();
  const { setUid, saveUID } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    const result = await login(email, password);
    result.status ? onSuccess(result) : onFailure(result);
  }

  function onSuccess(result) {
    if (remember) {
      saveUID(result.payload);
    }
    setUid(result.payload);
    navigate("/");
  }

  function onFailure(result) {
    alert(result.message);
  }

  return (
    <div className="auth-page">
      <h1>Login to Your Account</h1>
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
        <button className="primary-btn">Login</button>
      </form>
      <div className="links-container">
        <Link to="/recover-password">Forgot you password?</Link>
        <Link to="/sign-up">Create a new account</Link>
      </div>
    </div>
  );
}
