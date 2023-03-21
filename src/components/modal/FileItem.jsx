import { useState } from "react";
import fileIcon from "../../assets/images/file-icon.png";

export default function FileItem({ changeTitle, changeFile }) {
  const [title, setTitle] = useState("");
  function onChangeTitle(event) {
    setTitle(event.target.value);
    changeTitle(title);
  }

  return (
    <div className="file-item">
      <img src={fileIcon} alt="File icon" />
      <div>
        <label>
          Title
          <input type="text" value={title} onChange={onChangeTitle} />
        </label>
        <label>
          Choose File
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={changeFile}
          />
        </label>
      </div>
    </div>
  );
}
