import { useState } from "react";
import { createDocumentWithManualId } from "../../scripts/fireStore/createDocumentWithManualId";
import { useCourse } from "../../state/CoursesProvider";
import { createLink } from "../../scripts/fireStore/createLink";
import { createFile } from "../../scripts/fireStore/createFile";
import { downloadFile, uploadFile } from "../../scripts/cloudStorage";
import { AddFiles } from "./AddMaterials";
import { AddLinks } from "./AddMaterials";
import { v4 as uuidv4 } from "uuid";
import readFile from "../../scripts/resize-image/readFile";
import resizeImage from "../../scripts/resize-image/resizeImage";

export default function AddCourseForm({ setModal, header }) {
  const { dispatch } = useCourse();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [fileTitle, setFileTitle] = useState("");
  const [file, setFile] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [link, setLink] = useState("");
  const collection = "courses";
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const manualId = uuidv4() + "_" + Date.now();

  async function onSubmit(e) {
    const data = {
      id: manualId,
      title: title,
      image: image,
      description: description,
    };
    const fileData = {
      file: file,
      title: fileTitle,
    };
    const linkData = {
      link: link,
      title: linkTitle,
    };
    e.preventDefault();
    await createFile(collection, manualId, fileData);
    await createLink(collection, manualId, linkData);
    await createDocumentWithManualId(collection, manualId, data);
    dispatch({ type: "create", payload: data });
    setModal(null);
  }

  async function onChooseImage(event) {
    const file = event.target.files[0];
    const filePath = `courses/${manualId}_${file.name}`;
    const imageFromfile = await readFile(file);
    setButtonEnabled(false);
    const resizedImage = await resizeImage(imageFromfile, 325, 170);
    await uploadFile(resizedImage, filePath);
    setImage(await downloadFile(filePath));
    setButtonEnabled(true);
  }
  async function changeFile(event) {
    const file = event.target.files[0];
    const filePath = `files/${manualId}_${file.name}`;
    await uploadFile(file, filePath);
    setButtonEnabled(false);
    setFile(await downloadFile(filePath));
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
      <AddFiles changeTitle={setFileTitle} changeFile={changeFile} />
      <AddLinks changeTitle={setLinkTitle} changeLink={setLink} />
      <button disabled={!buttonEnabled} className="primary-btn">
        Submit
      </button>
    </form>
  );
}
