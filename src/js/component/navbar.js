import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom mb-3">
        <Link to="/" className="navbar-brand text-dark">
          Your Contacts
        </Link>
        <div className="ml-auto">
          <Link to="/formulario" className="nav-link">
            <button className="btn btn-primary">Add a New Contact</button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
