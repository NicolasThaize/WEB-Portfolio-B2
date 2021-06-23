import React from "react";
import {UserContext} from "../../../context";
import text from "../../../assets/texts/articles/writeComment.json";
import ArticlesListReplies from "./ArticlesListReplies";
import ArticlesWriteReply from "./ArticlesWriteReply";


class ArticlesListComments extends React.Component{
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

  render() {
    const { text, article } = this.state;
    return (
      <div>
        Composant d'affichage des commentaires
        { article.comments.map(comment => (
          <div key={comment.id}>
            {comment.author.username}: {comment.text}
            <ArticlesListReplies replies={comment.replies}/>
            <ArticlesWriteReply article={article}/>
          </div>
        )) }
      </div>
    );
  }
}

export default ArticlesListComments;
