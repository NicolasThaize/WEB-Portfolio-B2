import React from "react";
import { UserContext } from "../../context";
import text from "../../assets/texts/admin/navbar_admin.json";
import { Link } from "react-router-dom";

class NavbarIsAdmin extends React.Component {
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
    return (
      <div>
        <Link to="/admin">{text.panel_button_name}</Link>
      </div>
    );
  }
}

export default NavbarIsAdmin;
