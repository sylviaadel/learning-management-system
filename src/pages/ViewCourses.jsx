import { useEffect, useState } from "react";
import { readDocuments } from "../scripts/fireStore/readDocuments";
import { useCourse } from "../state/CoursesProvider";
import CourseItem from "../components/viewCourses/CourseItem";
import Hero from "../components/viewCourses/Hero";
import Spinner from "../components/shared/Spinner";
import NotFound from "./NotFound";
import coursesImg from "../assets/images/courses-img.png";
import { imgCoursesAlt } from "../scripts/helpers";

export default function ViewCourses({ collection }) {
  const { data, dispatch } = useCourse();
  const [status, setStatus] = useState(0);

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
    <div id="CoursesPage">
      {status === 0 && <Spinner />}
      {status === 1 && (
        <>
          <Hero />
          <section className="courses-container">
            <header>
              <h2>Available Courses</h2>
              <img src={coursesImg} alt={imgCoursesAlt} />
            </header>
            <section className="courses-list">{Courses}</section>
          </section>
        </>
      )}
      {status === 2 && <NotFound />}
    </div>
  );
}
