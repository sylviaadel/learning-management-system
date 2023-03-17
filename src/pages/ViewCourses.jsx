import CourseItem from "../components/viewCourses/CourseItem";
import Hero from "../components/viewCourses/Hero";
import coursesImg from "../assets/images/courses-img.png";

export default function ViewCourses() {
  const alt =
    "Clothes hanged on dressing along with shoes on ground and plates.";

  return (
    <div id="CoursesPage">
      <Hero />
      <section className="courses-container">
        <header>
          <h2>Available Courses</h2>
          <img src={coursesImg} alt={alt} />
        </header>
        <div className="courses-list">
          <CourseItem />
          <CourseItem />
        </div>
      </section>
    </div>
  );
}
