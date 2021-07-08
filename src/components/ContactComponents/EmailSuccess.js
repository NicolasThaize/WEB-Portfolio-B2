import React from "react";
import { UserContext } from "../../context";
import text from "../../assets/texts/navbar.json";

class EmailSuccess extends React.Component {
  static contextType = UserContext;
  lang = this.context.language;
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.context.language !== this.lang) {
      this.lang = this.context.language;
      this.setState({ text: text[this.context.language] });
    }
  }

  state = {
    text: text[this.lang],
  };

  render() {
    const { text } = this.state;
    return <div>email envoyé avec succes</div>;
  }
}

export default EmailSuccess;
