import { Link } from "react-router-dom";
import AddCourseForm from "../modal/AddCourseForm";
import { useCourse } from "../../state/CoursesProvider";
import ConfirmDelete from "../modal/ConfirmDelete";
import { deleteDocument } from "../../scripts/fireStore/deleteDocument";
import { updateDocument } from "../../scripts/fireStore/updateDocument";

export default function CourseItem({ item, setModal }) {
  const { id, title, description, image } = item;
  const { dispatch } = useCourse();
  const header = "Update Course Details";
  const collectionName = "courses";
  const isUpdate = true;

  function confirmDelete() {
    setModal(<ConfirmDelete setModal={setModal} onDelete={deleteCourse} />);
  }

  async function deleteCourse() {
    await deleteDocument(collectionName, id);
    dispatch({ type: "delete", payload: id });
  }

  async function openEditModal() {
    setModal(
      <AddCourseForm setModal={setModal} header={header} isUpdate={isUpdate} />
    );
    const data = { ...item, title: "zew" };
    await updateDocument(collectionName, data);
    dispatch({ type: "update", payload: data });
  }

  return (
    <article className="course-item">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={`/courses/${id}`} className="primary-btn">
        View Details
      </Link>
      <div className="actions">
        <button onClick={openEditModal}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button onClick={() => confirmDelete()}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </article>
  );
}
