import { useState } from "react";
import linkIcon from "../../assets/images/link-icon.png";

export default function LinkItem({ changeTitle, changeLink }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  function onChangeTitle(event) {
    setTitle(event.target.value);
    changeTitle(title);
  }
  function onChangeLink(event) {
    setLink(event.target.value);
    changeLink(event.target.value);
  }

  return (
    <div className="link-item">
      <img src={linkIcon} alt="Link icon" />
      <div>
        <label>
          Title
          <input type="text" value={title} onChange={onChangeTitle} />
        </label>
        <label>
          Link
          <input type="text" value={link} onChange={onChangeLink} />
        </label>
      </div>
    </div>
  );
}
