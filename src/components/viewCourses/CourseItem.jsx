import { Link } from "react-router-dom";
import AddCourseForm from "../admin/AddCourseForm";
import { useCourse } from "../../state/CourseProvider";
import ConfirmDelete from "../admin/ConfirmDelete";
import { deleteDocument } from "../../scripts/fireStore/deleteDocument";

export default function CourseItem({ item, setModal }) {
  const { id, title, description, image } = item;
  const { dispatch } = useCourse();
  const header = "Update Course Details";
  const collectionName = "courses";

  function confirmDelete() {
    setModal(
      <ConfirmDelete setModal={setModal} onConfirmDelete={deleteCourse} />
    );
  }
  async function deleteCourse() {
    await deleteDocument(collectionName, id);
    dispatch({ type: "delete", payload: id });
  }

  return (
    <article className="course-item">
      <button className="close" onClick={() => confirmDelete()}>
        &times;
      </button>
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
