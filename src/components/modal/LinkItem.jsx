import linkIcon from "../../assets/images/link-icon.png";

export default function LinkItem({ link, id, changeLink }) {
  function onChangeTitle(event) {
    link.title = event.target.value;
    changeLink(link, id);
  }

  function onChangeLink(event) {
    link.link = event.target.value;
    changeLink(link, id);
  }

  return (
    <div className="link-item">
      <img src={linkIcon} alt="Link icon" />
      <div>
        <label>
          Title
          <input type="text" value={link.title} onChange={onChangeTitle} />
        </label>
        <label>
          Link
          <input type="text" value={link.link} onChange={onChangeLink} />
        </label>
      </div>
    </div>
  );
}
