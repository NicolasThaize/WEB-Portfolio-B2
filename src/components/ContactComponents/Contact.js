import React from "react";
import { UserContext } from "../../context";
import text from "../../assets/texts/contact.json";
import ContactForm from "./ContactForm";

class Contact extends React.Component {
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
    return <div>
      {text.main_title}
      <ContactForm inputs={text.inputs}/>
    </div>;
  }
}

export default Contact;
