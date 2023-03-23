import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCourse } from "../state/CoursesProvider";
import { readDocuments } from "../scripts/fireStore/readDocuments";
import { readSubCollection } from "../scripts/fireStore/readSubCollection";
import Spinner from "../components/shared/Spinner";
import InvalidID from "../components/shared/InvalidID";
import Material from "../components/viewCourses/CourseMaterials";
import { courseText } from "../scripts/helpers";

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
      var currentFiles = await readSubCollection(`${collection}/${id}/files`);
      setFiles(currentFiles);
      var currentLinks = await readSubCollection(`${collection}/${id}/links`);
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
    <Material key={link.id} title={link.title} href={link.link} />
  ));
  const selectedFiles = files.map((file) => (
    <Material key={file.id} title={file.title} href={file.file} />
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
            <p>{courseText}</p>
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
