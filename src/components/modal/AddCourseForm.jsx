import { useState } from "react";
import FileItem from "./FileItem";
import LinkItem from "./LinkItem";

export default function AddCourseForm({ setModal, header }) {
  const fileItem = <FileItem />;
  const linkItem = <LinkItem />;

  const [files, setFiles] = useState([fileItem]);
  const [links, setLinks] = useState([linkItem]);

  function handleAddFile(e) {
    e.preventDefault();
    setFiles([...files, fileItem]);
  }

  function handleAddLink(e) {
    e.preventDefault();
    setLinks([...links, linkItem]);
  }

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
        <i onClick={handleAddFile} className="fa-solid fa-plus-circle"></i>
      </h3>
      {files}
      <h3>
        Links
        <i onClick={handleAddLink} className="fa-solid fa-plus-circle"></i>
      </h3>
      {links}
      <button data-testid="submit-btn" className="primary-btn" type="submit">
        Submit
      </button>
    </form>
  );
}
