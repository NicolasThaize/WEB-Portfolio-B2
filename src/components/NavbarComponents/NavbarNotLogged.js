import React from "react";
import { Link } from "react-router-dom";

class NavbarNotLogged extends React.Component {
  render() {
    return (
      <div>
        <Link to="/login">Connexion</Link>
        <Link to="/register">Inscription</Link>
      </div>
    );
  }
}

export default NavbarNotLogged;
