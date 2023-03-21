import { useState } from "react";
import FileItem from "./FileItem";

export default function Files({ courseFilesChanged }) {
  const [files, setFiles] = useState([{ title: "", file: "" }]);

  function changeFile(fileItem, fileIndex) {
    var cloned = [...files];
    cloned[fileIndex] = fileItem;
    setFiles(cloned);
    courseFilesChanged(files);
  }

  function addFile() {
    var cloned = [...files];
    cloned.push({ title: "", file: "" });
    setFiles(cloned);
    courseFilesChanged(files);
  }

  return (
    <>
      <h3>
        Files
        <i onClick={addFile} className="fa-solid fa-plus-circle"></i>
      </h3>
      {files.map((file, index) => (
        <FileItem changeFile={changeFile} file={file} key={index} id={index} />
      ))}
    </>
  );
}
