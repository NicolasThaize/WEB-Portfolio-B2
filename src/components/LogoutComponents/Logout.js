import React from "react";
import { UserContext } from "../../context";
import text from "../../assets/texts/logout.json";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {
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
    redirect: false,
  };

  handleLogout = () => {
    this.context.logoutUser();
    this.setState({ redirect: true });
  };

  render() {
    const { text, redirect } = this.state;
    return (
      <div>
        {redirect ? <Redirect to="/" /> : undefined}
        <button type="button" onClick={this.handleLogout}>
          {text.logout_button}
        </button>
      </div>
    );
  }
}

export default Logout;
