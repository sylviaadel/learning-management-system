import { useEffect, useState } from "react";
import { readDocuments } from "../../scripts/fireStore/readDocuments";
import { useCourse } from "../../state/CoursesProvider";
import Spinner from "../shared/Spinner";
import NotFound from "../../pages/NotFound";
import CourseItem from "../viewCourses/CourseItem";
import AddCourseForm from "../modal/AddCourseForm";

export default function ManageCourses({ setModal }) {
  const { data, dispatch } = useCourse();
  const [status, setStatus] = useState(0);
  const collection = "courses";
  const header = "Add new Course";

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
    <CourseItem key={item.id} item={item} setModal={setModal} />
  ));

  return (
    <>
      <button
        className="add-btn primary-btn"
        onClick={() =>
          setModal(<AddCourseForm setModal={setModal} header={header} />)
        }
      >
        + Add New
      </button>
      <div className="clear"></div>
      <section className="courses-list">
        {status === 0 && <Spinner />}
        {status === 1 && <>{Courses}</>}
        {status === 2 && <NotFound />}
      </section>
    </>
  );
}
