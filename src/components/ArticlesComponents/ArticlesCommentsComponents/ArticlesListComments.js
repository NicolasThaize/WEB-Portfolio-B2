import React from "react";
import {UserContext} from "../../../context";
import text from "../../../assets/texts/articles/writeComment.json";
import ArticlesListReplies from "./ArticlesListReplies";
import ArticlesWriteReply from "./ArticlesWriteReply";
import UserModule from "../../../UserModule";
import ArticlesModule from "../../../ArticlesService";
import ArticleCommentReplyDeleteValidation from "./ArticleCommentReplyDeleteValidation";


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
    userId: UserModule.getUserData().id,
    error: undefined,
    deleteLoading: false,
    deleteValidation: false,
    wantedToDeleteComment: undefined
  }



  wantToDelete = (comment) => {
    this.setState({wantedToDeleteComment:comment, deleteValidation: true})
  }

  triggerDelete = () => {
    this.setState({deleteValidation: !this.state.deleteValidation});
  }

  deleteComment = async (comment) => {
    console.log(comment)
    this.setState({deleteLoading: true})
    this.setState({error: undefined})
    await ArticlesModule.deleteComment(this.state.article, comment).then(r => {
      this.setState({deleteLoading: false})
    }).catch((err) => {
      console.log(err)
      this.setState({deleteLoading: false})
      this.setState({error: this.state.text.errors.error_delete})
    })
  }

  render() {
    const { text, article, userId, error, deleteLoading, deleteValidation, wantedToDeleteComment } = this.state;
    return (
      <div>
        { article.comments.map(comment => (
          <div key={comment.id} style={{margin: "25px"}}>
            {comment.author.id === userId ? <button onClick={() => this.wantToDelete(comment)}>Supprimer</button> : undefined }

            {deleteValidation && wantedToDeleteComment.id === comment.id ?
              <ArticleCommentReplyDeleteValidation
                deleteComment={this.deleteComment}
                trigger={this.triggerDelete}
                comment={comment}
              />
              : undefined}

            { error && wantedToDeleteComment.id === comment.id ? <p>{error}</p> : undefined }

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
