import linkIcon from "../../assets/images/link-icon.png";

export default function LinkItem() {
  return (
    <div className="link-item">
      <img src={linkIcon} alt="Link icon" />
      <div>
        <label>
          Title
          <input type="text" />
        </label>
        <label>
          Link
          <input type="text" />
        </label>
      </div>
    </div>
  );
}
