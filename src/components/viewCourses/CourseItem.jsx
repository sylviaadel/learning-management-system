import Sewing from "../../assets/images/sewing.png";
export default function CourseItem() {
  return (
    <article className="course-item">
      <img src={Sewing} />
      <h2>Sewing</h2>
      <p>
        It doesn't have to be hard, it just takes practice and patience, but
        soon you can be sewing like a pro.
      </p>
      <button className="primary-btn">View Details</button>
    </article>
  );
}
