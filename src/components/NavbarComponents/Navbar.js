import React from "react";
import NavbarIsLogged from "./NavbarIsLogged";
import NavbarNotLogged from "./NavbarNotLogged";
import ToggleLanguageButtons from "../ContextComponents/ToggleLanguageButtons";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        { this.context.language }
        { this.context.isLogged ? <NavbarIsLogged/> : <NavbarNotLogged/> }
        <ToggleLanguageButtons/>
      </div>
    );
  }
}

export default Navbar;
