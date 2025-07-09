import { useLocation } from 'react-router-dom'

export default function Navbar() {
  const path = useLocation().pathname.split("/").filter(Boolean);

  let accumulated = "";
  const navPath = path.map((segment, i) => {
    accumulated += "/" + segment;
    return (
      <span key={i}>
        {" > "}
        <a href={accumulated}>{decodeURIComponent(segment.replaceAll("%20", " "))}</a>
      </span>
    );
  });

  return (
    <div className='navbar'>
      <a href='/'>farisamer.com</a>
      {navPath}
    </div>
  );
}