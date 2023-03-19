import { useEffect, useState } from "react";
import { readDocuments } from "../../scripts/fireStore/readDocuments";
import { useCourse } from "../../state/CourseProvider";
import Spinner from "../shared/Spinner";
import NotFound from "../../pages/NotFound";
import CourseItem from "../viewCourses/CourseItem";
import AddCourseForm from "./AddCourseForm";

export default function ManageCourses({ setModal }) {
  const { data, dispatch } = useCourse();
  const [status, setStatus] = useState(0);
  const collection = "courses";

  useEffect(() => {
    loadData(collection);
  }, []);
  async function loadData(collection) {
    const data = await readDocuments(collection).catch(onFail);
    onSuccess(data);
  }

  function onSuccess(data) {
    dispatch({ type: "initializeArray", payload: data });
    setStatus(1);
  }

  function onFail() {
    setStatus(2);
  }

  const Courses = data.map((item) => (
    <CourseItem key={item.id} item={item} collectionName={collection} />
  ));

  return (
    <section className="courses-list">
      {status === 0 && <Spinner />}
      {status === 1 && <>{Courses}</>}
      {status === 2 && <NotFound />}
      <div
        className="course-item add-course"
        onClick={() => setModal(<AddCourseForm setModal={setModal} />)}
      >
        <i className="fa-solid fa-circle-plus"></i>
        <h3>ADD NEW</h3>
      </div>
    </section>
  );
}
