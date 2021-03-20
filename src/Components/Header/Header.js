import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
<div className="container-fluid bg-dark">
      <div className="container">
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/destination`}>
                  Destination
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/blog">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link> 
              </li>
              <li className="nav-item">
                {
                  loggedInUser.email ?<Link className="nav-link text-light" to="/login">{loggedInUser.email}</Link> :<Link className="nav-link" to="/login">Login</Link>
                }
              
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    );
};

export default Header;