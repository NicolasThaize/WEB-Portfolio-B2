import React from "react";
import {UserContext} from "../../../context";
import text from "../../../assets/texts/articles/comments.json";
import ArticlesWriteComment from "./ArticlesWriteComment";
import ArticlesListReplies from "./ArticlesListReplies";
import ArticlesListComments from "./ArticlesListComments";

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
    article: this.props.article
  }

  static getDerivedStateFromProps(props, state){
    return state.article = props.article
  }

  render() {
    const { text, article } = this.state;
    return (
      <div>
        <h2>Les commentaires: </h2>
          <ArticlesWriteComment article={article}/>
          <ArticlesListComments article={article}/>
      </div>
    );
  }
}

export default ArticlesComments;
