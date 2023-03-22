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
import courseTitle from "../../data/courseTitle.json";
import courseDescription from "../../data/courseDescription.json";
import InputText from "../form/InputText";
import InputTextArea from "../form/InputTextarea";

export default function AddCourseForm({ setModal, header, isUpdate }) {
  const { dispatch } = useCourse();
  const [image, setImage] = useState("");
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const collection = "courses";
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const manualId = uuidv4() + "_" + Date.now();
  const [form, setForm] = useState({ title: "", description: "" });
  const title = courseTitle[0];
  const desc = courseDescription[0];

  async function onSubmit(e) {
    const data = {
      id: manualId,
      title: form.title,
      image: image,
      description: form.description,
    };
    e.preventDefault();
    for (let i = 0; i < files.length; i++) {
      await createFile(collection, manualId, files[i]);
    }
    for (let i = 0; i < links.length; i++) {
      await createLink(collection, manualId, links[i]);
    }
    await createDocumentWithManualId(collection, manualId, data);
    dispatch({ type: "create", payload: data });
    setModal(null);

    // if (isUpdate === true) {
    //   alert("update");
    //   const newData = { ...data, title: "zew" };
    //   await updateDocument(collection, newData);
    //   dispatch({ type: "update", payload: data });
    // }
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

  function changeFiles(files) {
    setFiles(files);
  }
  function changeLinks(links) {
    setLinks(links);
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <h2>{header}</h2>
      <InputText key={title.id} item={title} state={[form, setForm]} />
      <InputTextArea key={desc.id} item={desc} state={[form, setForm]} />
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
