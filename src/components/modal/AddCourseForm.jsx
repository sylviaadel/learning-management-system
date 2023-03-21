import { useState } from "react";
import { createDocumentWithManualId } from "../../scripts/fireStore/createDocumentWithManualId";
import { useCourse } from "../../state/CoursesProvider";
import { createFile } from "../../scripts/fireStore/createFile";
import { createLink } from "../../scripts/fireStore/createLink";
import { downloadFile, uploadFile } from "../../scripts/cloudStorage";
import Files from "./Files";
import { Links } from "./Links";
import { v4 as uuidv4 } from "uuid";
import readFile from "../../scripts/resize-image/readFile";
import resizeImage from "../../scripts/resize-image/resizeImage";

export default function AddCourseForm({ setModal, header }) {
  const { dispatch } = useCourse();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
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
    e.preventDefault();
    for (let i = 0; i < files.length; i++) {
      await createFile(collection, manualId, files[i]);
    }
    for (let i = 0; i < links.length; i++) {
      await createLink(collection, manualId, links[i]);
    }
    //await createLink(collection, manualId, linkData);
    await createDocumentWithManualId(collection, manualId, data);
    dispatch({ type: "create", payload: data });
    setModal(null);
  }

  function changeFiles(files) {
    setFiles(files);
  }

  function changeLinks(links) {
    setLinks(links);
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
      <Files courseFilesChanged={changeFiles} />
      <Links courseLinksChanged={changeLinks} />
      <button disabled={!buttonEnabled} className="primary-btn">
        Submit
      </button>
    </form>
  );
}
