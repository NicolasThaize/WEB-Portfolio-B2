import React from "react";
import {UserContext} from '../../context';
import text from '../../assets/texts/home.json';

class Home extends React.Component {
  static contextType = UserContext;
  lang = this.context.language
  componentDidUpdate(prevProps, prevState, snapshot) {
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
        {text.test}
      </div>
    );
  }
}

export default Home;