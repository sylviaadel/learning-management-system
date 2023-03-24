import { useState, useEffect } from "react";
import LinkItem from "./LinkItem";

export function Links({ courseLinks, courseLinksChanged }) {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    setLinks(courseLinks);
  }, [courseLinks]);

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

  const Links = links.map((link, index) => (
    <LinkItem changeLink={changeLink} linkItem={link} key={index} id={index} />
  ));

  return (
    <>
      <h3>
        Links
        <i onClick={addLink} className="fa-solid fa-plus-circle"></i>
      </h3>
      {Links}
    </>
  );
}
