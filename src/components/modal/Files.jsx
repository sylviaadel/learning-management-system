import { useState, useEffect } from "react";
import FileItem from "./FileItem";

export default function Files({ courseFiles, courseFilesChanged }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setFiles(courseFiles);
  }, [courseFiles]);

  function changeFile(fileItem, fileIndex) {
    var cloned = [...files];
    cloned[fileIndex] = fileItem;
    setFiles(cloned);
    courseFilesChanged(cloned);
  }

  function addFile() {
    var cloned = [...files];
    cloned.push({ title: "", file: "" });
    setFiles(cloned);
    courseFilesChanged(cloned);
  }
  const Files = files.map((file, index) => (
    <FileItem changeFile={changeFile} fileItem={file} key={index} id={index} />
  ));

  return (
    <>
      <h3>
        Files
        <i onClick={addFile} className="fa-solid fa-plus-circle"></i>
      </h3>
      {Files}
    </>
  );
}
