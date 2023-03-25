import Files from "./Files";
import { Links } from "./Links";
import InputImage from "../form/InputImage";
import { useState, useEffect } from "react";

export default function Form({
  image,
  files,
  links,
  changeFiles,
  changeLinks,
  changeTitle,
  changeDescription,
  chooseImage,
  title,
  description,
}) {
  const [courseTitle, setCourseTitle] = useState(title);
  const [courseDescription, setCourseDescription] = useState(description);

  function onTitleChange(event) {
    setCourseTitle(event.target.value);
    changeTitle(event.target.value);
  }

  function onDescriptionChange(event) {
    setCourseDescription(event.target.value);
    changeDescription(event.target.value);
  }

  useEffect(() => {
    setCourseTitle(title);
  }, [title]);

  useEffect(() => {
    setCourseDescription(description);
  }, [description]);

  return (
    <>
      <label className="input-text">
        Title
        <input
          value={courseTitle}
          onChange={(event) => onTitleChange(event)}
          type="text"
          required
        />
      </label>
      <label className="input-text">
        Description
        <textarea
          value={courseDescription}
          onChange={(event) => onDescriptionChange(event)}
          required
        />
      </label>
      <InputImage chooseImage={chooseImage} image={image} />
      <Files courseFiles={files} courseFilesChanged={changeFiles} />
      <Links courseLinks={links} courseLinksChanged={changeLinks} />
    </>
  );
}
