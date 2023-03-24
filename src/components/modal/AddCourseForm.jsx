import { useState, useEffect } from "react";
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
import { readDocument } from "../../scripts/fireStore/readDocument";
import { readSubCollection } from "../../scripts/fireStore/readSubCollection";

export default function AddCourseForm({ setModal, header, isUpdate, id }) {
  const { dispatch } = useCourse();
  const [status, setStatus] = useState(0);
  const [image, setImage] = useState("");
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const collection = "courses";
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const currentCourseId = id === undefined ? uuidv4() + "_" + Date.now() : id;
  const [form, setForm] = useState({ title: "", description: "" });
  const titleItem = courseTitle[0];
  const descItem = courseDescription[0];
  const chooseImage = (event) =>
    onChooseImage(event, setButtonEnabled, setImage, currentCourseId);

  useEffect(() => {
    if (id !== undefined) {
      loadData(collection);
    } else {
      setFiles([{ title: "", file: "" }]);
      setLinks([{ title: "", link: "" }]);
    }
  }, []);

  async function loadData(collection) {
    const data = await readDocument(collection, id).catch(onFail);
    onSuccess(data);
  }

  async function onSuccess(data) {
    titleItem.value = data.title;
    descItem.value = data.description;
    var currentFiles = await readSubCollection(`${collection}/${id}/files`);
    var currentLinks = await readSubCollection(`${collection}/${id}/links`);
    setFiles(
      currentFiles.map(function (f) {
        return { title: f.title, file: f.file };
      })
    );
    setLinks(
      currentLinks.map(function (l) {
        return { title: l.title, link: l.link };
      })
    );
    // var currentLinks = await readSubCollection(`${collection}/${id}/links`);
    // setLinks(currentLinks);
    setStatus(1);
  }

  function onFail() {
    setStatus(2);
  }

  async function onSubmit(e) {
    const data = {
      id: currentCourseId,
      title: form.title,
      image: image,
      description: form.description,
    };
    e.preventDefault();
    for (let i = 0; i < files.length; i++) {
      await createFile(collection, currentCourseId, files[i]);
    }
    for (let i = 0; i < links.length; i++) {
      await createLink(collection, currentCourseId, links[i]);
    }
    await createDocumentWithManualId(collection, currentCourseId, data);
    dispatch({ type: "create", payload: data });
    setModal(null);
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
      <InputText key={titleItem.id} item={titleItem} state={[form, setForm]} />
      <InputTextArea
        key={descItem.id}
        item={descItem}
        state={[form, setForm]}
      />
      <label>
        Choose Image
        <input required type="file" accept={acceptImg} onChange={chooseImage} />
      </label>
      <Files courseFiles={files} courseFilesChanged={changeFiles} />
      <Links courseLinks={links} courseLinksChanged={changeLinks} />
      <button disabled={!buttonEnabled} className="primary-btn">
        Submit
      </button>
    </form>
  );
}
