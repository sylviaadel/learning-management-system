import { useState } from "react";
import FileItem from "./FileItem";
import LinkItem from "./LinkItem";

export function AddFiles() {
  const fileItem = <FileItem />;
  const [files, setFiles] = useState([fileItem]);

  function handleAddFile(e) {
    e.preventDefault();
    setFiles([...files, fileItem]);
  }
  return (
    <>
      <h3>
        Files
        <i onClick={handleAddFile} className="fa-solid fa-plus-circle"></i>
      </h3>
      {files}
    </>
  );
}

export function AddLinks() {
  const linkItem = <LinkItem />;
  const [links, setLinks] = useState([linkItem]);

  function handleAddLink(e) {
    e.preventDefault();
    setLinks([...links, linkItem]);
  }
  return (
    <>
      <h3>
        Links
        <i onClick={handleAddLink} className="fa-solid fa-plus-circle"></i>
      </h3>
      {links}
    </>
  );
}
