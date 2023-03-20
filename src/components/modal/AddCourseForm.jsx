import { useState } from "react";
import FileItem from "./FileItem";
import LinkItem from "./LinkItem";
import { createDocument } from "../../scripts/fireStore/createDocument";
import { useCourse } from "../../state/CoursesProvider";
import { downloadFile, uploadFile } from "../../scripts/cloudStorage";

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
      title: title,
      image: image,
      description: description,
    };
    e.preventDefault();
    const documentId = await createDocument(collection, data);
    dispatch({ type: "create", payload: { id: documentId, ...data } });
    setModal(null);
  }

  async function onChangeImage(event) {
    const file = event.target.files[0];
    const filePath = "courses/" + file.name;
    let result = "";
    await uploadFile(file, filePath);
    result = await downloadFile(filePath);
    setImage(result);
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
        {/* <img src={image} alt="Image preview" /> */}
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={(event) => onChangeImage(event)}
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
      <button data-testid="submit-btn" className="primary-btn" type="submit">
        Submit
      </button>
    </form>
  );
}
