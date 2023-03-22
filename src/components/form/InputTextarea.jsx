export default function InputTextArea({ item, state }) {
  const [form, setForm] = state;
  const formKey = [item.key];
  const formValue = form[item.key];

  return (
    <label>
      {item.label}
      <textarea
        value={formValue}
        onChange={(event) =>
          setForm({ ...form, [formKey]: event.target.value })
        }
        required={item.required}
      ></textarea>
    </label>
  );
}
