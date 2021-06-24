import React from "react";
import {UserContext} from "../../../context";
import text from "../../../assets/texts/articles/comments.json";
import ArticlesWriteComment from "./ArticlesWriteComment";
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

  reloadArticle = (newArticle) => {
    this.setState({article: newArticle})
  }

  render() {
    const { text, article } = this.state;
    return (
      <div>
        <h2>Les commentaires: </h2>
        { 'comments' in article ?
          <div>
            <ArticlesWriteComment article={article} reloadArticle={this.reloadArticle}/>
            <ArticlesListComments article={article}/>
          </div>
          : undefined
        }

      </div>
    );
  }
}

export default ArticlesComments;
