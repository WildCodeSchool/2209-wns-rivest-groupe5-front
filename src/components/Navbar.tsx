import { Link } from "react-router-dom";

const Navbar = () => {
    return (
      <nav>
        <ul>
          <li>
            <Link to={`/`}>Home Page</Link>
          </li>
          <li>
            <Link to={`/login`}>Login</Link>
          </li>
        </ul>
      </nav>
    );
}

export default Navbar;