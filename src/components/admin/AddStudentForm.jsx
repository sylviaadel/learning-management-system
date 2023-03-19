export default function AddStudentForm({ setModal, header }) {
  function onSubmit(e) {
    setModal(null);
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <h2>{header}</h2>
      <label>
        Name
        <input required autoFocus type="text" />
      </label>
      <label>
        Choose Image
        <input type="file" />
      </label>
      <label>
        Email
        <input required type="email" />
      </label>
      <label>
        Password
        <input required type="text" />
      </label>
      <button data-testid="submit-btn" className="primary-btn" type="submit">
        Submit
      </button>
    </form>
  );
}
