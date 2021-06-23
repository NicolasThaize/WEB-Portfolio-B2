import React from "react";
import {UserContext} from "../../../context";
import text from "../../../assets/texts/articles/writeComment.json";
import ArticlesListReplies from "./ArticlesListReplies";
import ArticlesWriteReply from "./ArticlesWriteReply";
import UserModule from "../../../UserModule";


class ArticlesListComments extends React.Component{
  static contextType = UserContext;
  lang = this.context.language
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.context.language !== this.lang){
      this.lang = this.context.language
      this.setState({text: text[this.context.language]})
    }
  }

  static getDerivedStateFromProps(props, state){
    return state.article = props.article
  }

  state = {
    text: text[this.lang],
    article: this.props.article,
    userId: UserModule.getUserData().id
  }

  deleteComment = (comment) => {

  }

  render() {
    const { text, article, userId } = this.state;
    return (
      <div>
        { article.comments.map(comment => (
          <div key={comment.id}>

            {comment.author.id === userId ? <button onClick={() => this.deleteComment(comment)}>Supprimer</button> : undefined }

            {comment.author.username}: {comment.text}
            <ArticlesListReplies replies={comment.replies}/>
            <ArticlesWriteReply article={article}/>
          </div>
        )) }
        { article.comments.length === 0 ? <p>{text.no_comments}</p> : undefined}
      </div>
    );
  }
}

export default ArticlesListComments;
