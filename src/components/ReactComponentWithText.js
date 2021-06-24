import React from "react";
import { UserContext } from "../context";

let text = {};
class ReactComponentWithText extends React.Component {
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
}

export default ReactComponentWithText;
