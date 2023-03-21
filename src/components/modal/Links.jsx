import { useState } from "react";
import LinkItem from "./LinkItem";

export function Links({ changeTitle, changeLink }) {
  return (
    <>
      <h3>
        Links
        <i className="fa-solid fa-plus-circle"></i>
      </h3>
      <LinkItem changeTitle={changeTitle} changeLink={changeLink} />
    </>
  );
}
