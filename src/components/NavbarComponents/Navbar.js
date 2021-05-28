import React from "react";
import NavbarIsLogged from "./NavbarIsLogged";
import NavbarNotLogged from "./NavbarNotLogged";
import ToggleLanguageButtons from "../ContextComponents/ToggleLanguageButtons";
import {UserContext} from "../../context";
import text from "../../assets/texts/navbar.json";

class Navbar extends React.Component {
  static contextType = UserContext;
  lang = this.context.language
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.context)
    if (this.context.language !== this.lang){
      this.lang = this.context.language
      this.setState({text: text[this.context.language]})
    }
  }

  state = {
    text: text[this.lang]
  }

  render() {
    const { text } = this.state;
    return (
      <div>
        <div>
          { this.context.language }
          { this.context.isLogged ? <NavbarIsLogged/> : <NavbarNotLogged/> }
          <ToggleLanguageButtons/>
        </div>
      </div>
    );
  }
}

export default Navbar;
