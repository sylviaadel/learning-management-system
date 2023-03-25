import { useState, useEffect } from "react";
import { useCourse } from "../../state/CoursesProvider";
import { onChooseImage } from "../../scripts/resize-image/chooseImage";
import { readDocument } from "../../scripts/fireStore/readDocument";
import { readSubCollection } from "../../scripts/fireStore/readSubCollection";
import { updateDocument } from "../../scripts/fireStore/updateDocument";
import FormItems from "./FormItems";

export default function UpdateCourse({ setModal, header, id }) {
  const { dispatch } = useCourse();
  const [status, setStatus] = useState(0);
  const [image, setImage] = useState("");
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const collection = "courses";
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const currentCourseId = id;
  const chooseImage = (event) =>
    onChooseImage(event, setButtonEnabled, setImage, currentCourseId);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadData(collection);
  }, [currentCourseId]);

  async function loadData(collection) {
    const data = await readDocument(collection, id).catch(onFail);
    onSuccess(data);
  }

  async function onSuccess(data) {
    setTitle(data.title);
    setDescription(data.description);
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
    setImage(data.image);
    setStatus(1);
  }

  function onFail() {
    setStatus(2);
  }

  async function onSubmit(event) {
    const data = {
      id: currentCourseId,
      title: title,
      description: description,
      image: image,
    };
    event.preventDefault();
    await updateDocument(collection, data);
    dispatch({ type: "update", payload: data });
    setModal(null);
  }

  function changeFiles(files) {
    setFiles(files);
  }
  function changeLinks(links) {
    setLinks(links);
  }
  function changeTitle(title) {
    setTitle(title);
  }
  function changeDescription(description) {
    setDescription(description);
  }

  return (
    <form onSubmit={(event) => onSubmit(event)} className="update">
      <h2>{header}</h2>
      <FormItems
        image={image}
        files={files}
        links={links}
        changeFiles={changeFiles}
        changeLinks={changeLinks}
        chooseImage={chooseImage}
        changeTitle={changeTitle}
        changeDescription={changeDescription}
        title={title}
        description={description}
      />
      <button disabled={!buttonEnabled} className="primary-btn">
        Submit
      </button>
      <div className="clear"></div>
    </form>
  );
}
