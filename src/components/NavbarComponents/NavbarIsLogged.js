import React from "react";
import {UserContext} from "../../context";
import text from "../../assets/texts/navbar.json";

class NavbarIsLogged extends React.Component{
  static contextType = UserContext;
  lang = this.context.language

  state = {
    text: text[this.lang],
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.context.language !== this.lang){
      this.lang = this.context.language
      this.setState({text: text[this.context.language]})
    }
  }

  render() {
    const { text } = this.state;
    return (
      <div>
        {text.test} {this.context.username}
      </div>
    );
  }
}

export default NavbarIsLogged;
