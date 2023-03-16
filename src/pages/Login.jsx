import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../scripts/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const result = await login(email, password);
    result.status ? onSuccess(result) : onFailure(result);
  }

  function onSuccess() {
    navigate("/secret-page");
  }

  function onFailure(result) {
    alert(result.message);
  }

  return (
    <div className="auth-page">
      <h1>Login to Your Account</h1>
      <form onSubmit={(event) => onSubmit(event)}>
        <input
          placeholder="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <button>Login</button>
      </form>
      <Link to="/recover-password">Forgot password?</Link>
      <br />
      <Link to="/sign-up">Create a new account</Link>
    </div>
  );
}
