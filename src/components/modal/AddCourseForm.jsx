import { useState } from "react";
import { createDocumentWithManualId } from "../../scripts/fireStore/createDocumentWithManualId";
import { useCourse } from "../../state/CoursesProvider";
import { createFile } from "../../scripts/fireStore/createFile";
import { createLink } from "../../scripts/fireStore/createLink";
import Files from "./Files";
import { Links } from "./Links";
import { v4 as uuidv4 } from "uuid";
import courseTitle from "../../data/courseTitle.json";
import courseDescription from "../../data/courseDescription.json";
import InputText from "../form/InputText";
import InputTextArea from "../form/InputTextarea";
import { onChooseImage } from "../../scripts/resize-image/chooseImage";
import { acceptImg } from "../../scripts/helpers";

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
  const chooseImage = (event) =>
    onChooseImage(event, setButtonEnabled, setImage, manualId);

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
    // }
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
        <input required type="file" accept={acceptImg} onChange={chooseImage} />
      </label>
      <Files courseFilesChanged={changeFiles} />
      <Links courseLinksChanged={changeLinks} />
      <button disabled={!buttonEnabled} className="primary-btn">
        Submit
      </button>
    </form>
  );
}
