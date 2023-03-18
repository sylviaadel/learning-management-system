export default function NavbarLink({ item }) {
  const { title, link, icon } = item;

  return (
    <li key={title}>
      <a href={link} target="_blank" rel="noreferrer">
        <i className={icon}></i>
        <span className="link-text">{title}</span>
      </a>
    </li>
  );
}
