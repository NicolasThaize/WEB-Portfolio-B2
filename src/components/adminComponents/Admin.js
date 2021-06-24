import React from "react";
import { UserContext } from "../../context";
import text from "../../assets/texts/admin/admin.json";
import AdminArticle from "./adminArticlesComponents/AdminArticle";

class Admin extends React.Component {
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
    current: "articles",
  };

  /**
   * Is called when a button is pressed, change 'current' in state
   * @param current
   */
  toggleCurrent = (current) => {
    this.setState({ current: current });
  };

  render() {
    const { text, current } = this.state;
    return (
      <div>
        <ul>
          {text.menu.map((field) => (
            <li key={field.id}>
              <button onClick={() => this.toggleCurrent(field.link)}>
                {field.name}
              </button>
            </li>
          ))}
        </ul>
        <div>{current === "articles" ? <AdminArticle /> : undefined}</div>
      </div>
    );
  }
}

export default Admin;
