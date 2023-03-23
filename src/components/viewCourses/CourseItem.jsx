import { Link } from "react-router-dom";
import AddCourseForm from "../modal/AddCourseForm";
import { useCourse } from "../../state/CoursesProvider";
import InfoPopup from "../modal/InfoPopup";
import { deleteDocument } from "../../scripts/fireStore/deleteDocument";
import AdminActions from "./AdminActions";
import { deleteInfo } from "../../scripts/helpers";

export default function CourseItem({ item, setModal }) {
  const { id, title, description, image } = item;
  const { dispatch } = useCourse();
  const header = "Update Course Details";
  const collectionName = "courses";

  function confirmDelete() {
    setModal(
      <InfoPopup setModal={setModal} onClose={deleteCourse} item={deleteInfo} />
    );
  }

  async function deleteCourse() {
    await deleteDocument(collectionName, id);
    dispatch({ type: "delete", payload: id });
  }

  async function openEditModal() {
    setModal(<AddCourseForm id={id} setModal={setModal} header={header} />);
  }

  return (
    <article className="course-item">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={`/courses/${id}`} className="primary-btn">
        View Details
      </Link>
      <AdminActions openModal={openEditModal} confirm={confirmDelete} />
    </article>
  );
}
