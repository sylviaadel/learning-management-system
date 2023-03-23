import fileIcon from "../../assets/images/file-icon.png";
import { uploadFile } from "../../scripts/cloudStorage";
import { downloadFile } from "../../scripts/cloudStorage";
import { v4 as uuidv4 } from "uuid";
import { acceptFile } from "../../scripts/helpers";

export default function FileItem({ file, id, changeFile }) {
  const manualId = uuidv4() + "_" + Date.now();

  function onChangeTitle(event) {
    file.title = event.target.value;
    changeFile(file, id);
  }

  async function onChangeFile(event) {
    file.file = await uploadCourseFile(event.target.files[0]);
    changeFile(file, id);
  }

  async function uploadCourseFile(file) {
    const filePath = `files/${manualId}_${file.name}`;
    await uploadFile(file, filePath);
    return await downloadFile(filePath);
  }

  return (
    <div className="file-item">
      <img src={fileIcon} alt="File icon" />
      <div>
        <label>
          Title
          <input type="text" value={file.title} onChange={onChangeTitle} />
        </label>
        <label>
          Choose File
          <input type="file" accept={acceptFile} onChange={onChangeFile} />
        </label>
      </div>
    </div>
  );
}
