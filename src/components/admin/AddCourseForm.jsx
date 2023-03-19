import fileIcon from "../../assets/images/file-icon.png";
import linkIcon from "../../assets/images/link-icon.png";

export default function AddCourseForm({ setModal, header }) {
  function onSubmit(e) {
    setModal(null);
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <h2>{header}</h2>
      <label>
        Title
        <input required autoFocus type="text" />
      </label>
      <label>
        Description
        <textarea required />
      </label>
      <label>
        Choose Image
        <input required type="file" />
      </label>
      <h3>
        Files
        <i className="fa-solid fa-plus-circle"></i>
      </h3>
      <div>
        <img src={fileIcon} alt="File icon" />
        <div>
          <label>
            Title
            <input type="text" />
          </label>
          <label>
            Choose File
            <input type="file" />
          </label>
        </div>
      </div>
      <h3>
        Links
        <i className="fa-solid fa-plus-circle"></i>
      </h3>
      <div>
        <img src={linkIcon} alt="Link icon" />
        <div>
          <label>
            Title
            <input type="text" />
          </label>
          <label>
            Link
            <input type="text" />
          </label>
        </div>
      </div>
      <button data-testid="submit-btn" className="primary-btn" type="submit">
        Submit
      </button>
    </form>
  );
}
