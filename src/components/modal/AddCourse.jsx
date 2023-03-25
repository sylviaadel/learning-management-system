import { useState } from "react";
import { createDocumentWithManualId } from "../../scripts/fireStore/createDocumentWithManualId";
import { useCourse } from "../../state/CoursesProvider";
import { createItem } from "../../scripts/fireStore/createItem";
import { v4 as uuidv4 } from "uuid";
import { onChooseImage } from "../../scripts/resize-image/chooseImage";
import FormItems from "./FormItems";

export default function AddCourse({ setModal, header, id }) {
  const { dispatch } = useCourse();
  const [image, setImage] = useState("");
  const [files, setFiles] = useState([{ title: "", file: "" }]);
  const [links, setLinks] = useState([{ title: "", link: "" }]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const collection = "courses";
  const [buttonEnabled, setButtonEnabled] = useState(true);
  id = uuidv4() + "_" + Date.now();
  const chooseImage = (event) =>
    onChooseImage(event, setButtonEnabled, setImage, id);

  async function onSubmit(event) {
    event.preventDefault();
    const data = {
      id: id,
      title: title,
      image: image,
      description: description,
    };
    for (let i = 0; i < files.length; i++) {
      await createItem(collection, id, files[i], "files");
    }
    for (let i = 0; i < links.length; i++) {
      await createItem(collection, id, links[i], "links");
    }
    await createDocumentWithManualId(collection, id, data);
    dispatch({ type: "create", payload: data });
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
    <form onSubmit={(event) => onSubmit(event)}>
      <h2>{header}</h2>
      <FormItems
        image={image}
        files={files}
        links={links}
        changeFiles={changeFiles}
        changeTitle={changeTitle}
        changeDescription={changeDescription}
        changeLinks={changeLinks}
        chooseImage={chooseImage}
        title={""}
        desc={""}
      />
      <button disabled={!buttonEnabled} className="primary-btn">
        Submit
      </button>
      <div className="clear"></div>
    </form>
  );
}
