import specialImg from "../../assets/images/special-img.png";
import specialItem from "../../data/specialItems.json";

const Items = specialItem.map((item) => (
  <article className="special-item" key={item.id}>
    <img src={`images/${item.image}`} alt={item.alt} />
    <p>{item.title}</p>
  </article>
));

export default function SpecialFeatures() {
  return (
    <section className="special-features">
      <header>
        <h2>Specially features are only for you</h2>
        <img
          src={specialImg}
          alt="A pink notebook, papers, a pencil and eyeglasses over them"
        />
      </header>
      <div>{Items}</div>
    </section>
  );
}
