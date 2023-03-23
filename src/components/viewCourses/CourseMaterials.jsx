export default function Material({ href, title }) {
  return (
    <li>
      <a href={href} target="_blank" rel="noreferrer">
        {title}
      </a>
    </li>
  );
}
