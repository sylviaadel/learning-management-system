import fileIcon from "../../assets/images/file-icon.png";

export default function FileItem() {
  return (
    <div className="file-item">
      <img src={fileIcon} alt="File icon" />
      <div>
        <label>
          Title
          <input type="text" />
        </label>
        <label>
          Choose File
          <input type="file" />
        </label>
      </div>
    </div>
  );
}
