import { Link } from "react-router-dom";
import UpdateCourse from "../modal/UpdateCourse";
import { useCourse } from "../../state/CoursesProvider";
import InfoPopup from "../modal/InfoPopup";
import { deleteDocument } from "../../scripts/fireStore/deleteDocument";
import AdminActions from "./AdminActions";
import { deleteInfo } from "../../scripts/helpers";
import imgIcon from "../../assets/images/camera-icon.png";

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
    setModal(<UpdateCourse id={id} setModal={setModal} header={header} />);
  }

  return (
    <article className="course-item">
      <img src={image ? image : imgIcon} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={`/courses/${id}`} className="primary-btn">
        View Details
      </Link>
      <AdminActions openModal={openEditModal} confirm={confirmDelete} />
    </article>
  );
}
