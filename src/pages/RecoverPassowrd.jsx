import { useState } from "react";
import { Link } from "react-router-dom";
import { recoverAccount } from "../scripts/auth/recoverAccount";
import loginData from "../data/loginData.json";
import InputText from "../components/form/InputText";

export default function RecoverPassowrd() {
  const [form, setForm] = useState({ email: "" });
  const email = loginData[0];

  async function onSubmit(event) {
    event.preventDefault();
    const result = await recoverAccount(form.email);
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
        <InputText key={email.id} item={email} state={[form, setForm]} />
        <button className="primary-btn">Recover Account</button>
      </form>
      <Link to="/login">Go back to Login</Link>
    </div>
  );
}
