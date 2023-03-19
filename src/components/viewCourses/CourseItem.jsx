import { Link } from "react-router-dom";
import AddCourseForm from "../admin/AddCourseForm";

export default function CourseItem({ item, setModal }) {
  const { id, title, description, image } = item;
  const header = "Update Course Details";

  return (
    <article className="course-item">
      <button className="close">&times;</button>
      <img src={image} alt="Sewing" />
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={`/courses/${id}`} className="primary-btn">
        View Details
      </Link>
      <button
        className="primary-btn"
        onClick={() =>
          setModal(<AddCourseForm setModal={setModal} header={header} />)
        }
      >
        <i className="fa-solid fa-pen-to-square"></i> Edit
      </button>
    </article>
  );
}
