import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>PG Finder</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/nearby">Nearby PGs</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
