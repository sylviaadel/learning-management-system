import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCourse } from "../state/CoursesProvider";
import { readDocuments } from "../scripts/fireStore/readDocuments";
import { readLinks } from "../scripts/fireStore/readLinks";
import Spinner from "../components/shared/Spinner";
import InvalidID from "../components/shared/InvalidID";

export default function CourseDetails({ collection }) {
  let { id } = useParams();
  const { data, dispatch } = useCourse();
  const [status, setStatus] = useState(0);
  const currentCourse = data.find((course) => course.id === id);
  const [links, setLinks] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    loadData(collection);
  }, []);

  async function loadData(collection) {
    if (currentCourse === undefined) {
      setStatus(2);
    } else {
      const data = await readDocuments(collection).catch(onFail);
      var currentFiles = await readLinks(`${collection}/${id}/files`);
      setFiles(currentFiles);
      var currentLinks = await readLinks(`${collection}/${id}/links`);
      setLinks(currentLinks);
      onSuccess(data);
    }
  }

  function onSuccess(data) {
    dispatch({ type: "initializeArray", payload: data });
    setStatus(1);
  }

  function onFail() {
    setStatus(2);
  }

  const selectedLinks = links.map((link) => (
    <li key={link.id}>
      <a href={link.link} target="_blank">
        {link.title}
      </a>
    </li>
  ));
  const selectedFiles = files.map((file) => (
    <li key={file.id}>
      <a href={file.file} target="_blank">
        {file.title}
      </a>
    </li>
  ));

  return (
    <div id="CourseDetails">
      {status === 0 && <Spinner />}
      {status === 1 && (
        <>
          <h1>{currentCourse.title}</h1>
          <header>
            <p>{currentCourse.description}</p>
            <img src={currentCourse.image} alt={currentCourse.title} />
          </header>
          <div className="course-content">
            <p>
              Please check below all materials needed to be professional in this
              course:
            </p>
            <h3>Files</h3>
            <ul>{selectedFiles}</ul>
            <h3>Links</h3>
            <ul>{selectedLinks}</ul>
          </div>
          <Link to="/" className="primary-btn">
            Back
          </Link>
        </>
      )}
      {status === 2 && <InvalidID />}
    </div>
  );
}
