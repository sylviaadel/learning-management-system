import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../scripts/auth/createAccount";
import { useUser } from "../state/UsersProvider";
import signupData from "../data/signupData.json";
import InputText from "../components/form/InputText";
import InputCheckbox from "../components/form/InputCheckbox";

export default function SignUp() {
  const navigate = useNavigate();
  const { setUid, saveUID } = useUser();
  const [remember, setRemember] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  async function onSubmit(event) {
    event.preventDefault();
    const result = await createAccount(form.name, form.email, form.password);
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

  const FormFields = signupData.map((item) => (
    <InputText key={item.id} item={item} state={[form, setForm]} />
  ));

  return (
    <div className="auth-page">
      <h1>Create a new Account</h1>
      <form onSubmit={(event) => onSubmit(event)}>
        {FormFields}
        <InputCheckbox remember={remember} set={() => setRemember(!remember)} />
        <button className="primary-btn">Sign Up</button>
      </form>
      <Link to="/login">Already have an account</Link>
    </div>
  );
}
