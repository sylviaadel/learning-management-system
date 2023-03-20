import { useState } from "react";
import FileItem from "./FileItem";
import LinkItem from "./LinkItem";
import { createDocument } from "../../scripts/fireStore/createDocument";
import { createDocumentWithManualId } from "../../scripts/fireStore/createDocumentWithManualId";
import { useCourse } from "../../state/CoursesProvider";
import { downloadFile, uploadFile } from "../../scripts/cloudStorage";
import { v4 as uuidv4 } from "uuid";

export default function AddCourseForm({ setModal, header }) {
  const { dispatch } = useCourse();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const collection = "courses";
  const fileItem = <FileItem />;
  const linkItem = <LinkItem />;
  const [files, setFiles] = useState([fileItem]);
  const [links, setLinks] = useState([linkItem]);
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const manualId = uuidv4() + "_" + Date.now();

  function handleAddFile(e) {
    e.preventDefault();
    setFiles([...files, fileItem]);
  }

  function handleAddLink(e) {
    e.preventDefault();
    setLinks([...links, linkItem]);
  }

  async function onSubmit(e) {
    const data = {
      id: manualId,
      title: title,
      image: image,
      description: description,
    };
    e.preventDefault();
    await createDocumentWithManualId(collection, manualId, data);
    dispatch({ type: "create", payload: data });
    setModal(null);
  }

  async function onChooseImage(event) {
    const file = event.target.files[0];
    const filePath = `courses/${manualId}_${file.name}`;
    setButtonEnabled(false);
    await uploadFile(file, filePath);
    setImage(await downloadFile(filePath));
    setButtonEnabled(true);
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <h2>{header}</h2>
      <label>
        Title
        <input
          required
          autoFocus
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Description
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Choose Image
        <input
          required
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={(event) => onChooseImage(event)}
        />
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
      <button disabled={!buttonEnabled} className="primary-btn">
        Submit
      </button>
    </form>
  );
}
