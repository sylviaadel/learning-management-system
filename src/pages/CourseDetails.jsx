import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCourse } from "../state/CoursesProvider";
import { readDocuments } from "../scripts/fireStore/readDocuments";
import Spinner from "../components/shared/Spinner";
import InvalidID from "../components/shared/InvalidID";

export default function CourseDetails({ collection }) {
  let { id } = useParams();
  const { data, dispatch } = useCourse();
  const [status, setStatus] = useState(0);
  const currentCourse = data.find((c) => c.id === id);

  useEffect(() => {
    loadData(collection);
  }, []);

  async function loadData(collection) {
    if (currentCourse == undefined) {
      setStatus(2);
    } else {
      const data = await readDocuments(collection).catch(onFail);
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

  return (
    <>
      {status === 0 && <Spinner />}
      {status === 1 && (
        <div id="CourseDetails">
          <h1>{currentCourse.title}</h1>
          <header>
            <p>{currentCourse.description}</p>
            <img src={currentCourse.image} alt={currentCourse.title} />
          </header>
          <div className="course-content">
            <p>
              Please check below all materials needed to know how to be
              professional in this course:
            </p>
            <h3>Files</h3>
            <ul>
              <li>
                <a>File 1</a>
              </li>
              <li>
                <a>File 2</a>
              </li>
            </ul>
            <h3>Links</h3>
            <ul>
              <li>
                <a>Link 1</a>
              </li>
              <li>
                <a>Link 2</a>
              </li>
            </ul>
          </div>
          <Link to="/courses" className="primary-btn">
            Back
          </Link>
        </div>
      )}
      {status === 2 && <InvalidID />}
    </>
  );
}
