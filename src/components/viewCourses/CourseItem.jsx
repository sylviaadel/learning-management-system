import { Link } from "react-router-dom";

export default function CourseItem({ item, collectionName }) {
  const { id, title, description, image } = item;

  return (
    <article className="course-item">
      <img src={image} alt="Sewing" />
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={`/courses/${id}`} className="primary-btn">
        View Details
      </Link>
    </article>
  );
}
