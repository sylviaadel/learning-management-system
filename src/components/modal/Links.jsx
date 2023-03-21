import { useState } from "react";
import LinkItem from "./LinkItem";

export function Links({ courseLinksChanged }) {
  const [links, setLinks] = useState([{ title: "", link: "" }]);

  function changeLink(linkItem, linkIndex) {
    var cloned = [...links];
    cloned[linkIndex] = linkItem;
    setLinks(cloned);
    courseLinksChanged(links);
  }

  function addLink() {
    var cloned = [...links];
    cloned.push({ title: "", link: "" });
    setLinks(cloned);
    courseLinksChanged(links);
  }

  return (
    <>
      <h3>
        Links
        <i onClick={addLink} className="fa-solid fa-plus-circle"></i>
      </h3>
      {links.map((link, index) => (
        <LinkItem changeLink={changeLink} link={link} key={index} id={index} />
      ))}
    </>
  );
}
