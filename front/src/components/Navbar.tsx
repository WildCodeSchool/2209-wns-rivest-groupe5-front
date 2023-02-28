import {Link} from 'react-router-dom';
import '../index.css';

const Navbar = () => {
  return (
    <nav>
      <ul className="ul-custom">
        <li className="li-custom">
          <Link to={`/`}>Home Page</Link>
        </li>
        <li className="li-custom">
          <Link to={`/register`}>Register</Link>
        </li>
        <li className="li-custom">
          <Link to={`/login`}>Login</Link>
        </li>
        <li className="li-custom">
          <Link to={`/my-account`}>Mon compte</Link>
        </li>
        <li className="li-custom">
          <Link to={`/profile/:userId`}>Profil de user ...</Link>
        </li>
        <li className="li-custom">
          <Link to={`/dashboard`}>Dashboard</Link>
        </li>
        <li className="li-custom">
          <Link to={`/good-deals-feed`}>Feed Good Deals</Link>
        </li>
        <li className="li-custom">
          <Link to={`/good-deals-form`}>Form Good Deals</Link>
        </li>
        <li className="li-custom">
          <Link to={`/contribution`}>Contribution</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
