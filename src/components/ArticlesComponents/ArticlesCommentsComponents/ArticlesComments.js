import React from "react";
import {UserContext} from "../../../context";
import text from "../../../assets/texts/articles/comments.json";

class ArticlesComments extends React.Component{
  static contextType = UserContext;
  lang = this.context.language
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.context.language !== this.lang){
      this.lang = this.context.language
      this.setState({text: text[this.context.language]})
    }
  }

  state = {
    text: text[this.lang],
    comments: this.props.comments
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    const { text } = this.state;
    return (
      <div>

      </div>
    );
  }
}

export default ArticlesComments;
