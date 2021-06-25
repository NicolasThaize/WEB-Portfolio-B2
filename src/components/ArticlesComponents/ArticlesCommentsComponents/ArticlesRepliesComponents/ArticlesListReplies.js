import React from "react";
import { UserContext } from "../../../../context";
import text from "../../../../assets/texts/articles/writeComment.json";
import UserModule from "../../../../UserModule";
import ArticleCommentReplyDeleteValidation from "../ArticleCommentReplyDeleteValidation";
import CommentsService from "../../../../CommentsService";

class ArticlesListReplies extends React.Component {
  static contextType = UserContext;
  lang = this.context.language;
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.context.language !== this.lang) {
      this.lang = this.context.language;
      this.setState({ text: text[this.context.language] });
    }
  }

  componentDidMount() {
    const value = UserModule.getUserData()
      ? UserModule.getUserData().id
      : undefined;
    this.setState({ userId: value });
  }

  static getDerivedStateFromProps(props, state) {
    return (state.comment = props.comment);
  }

  state = {
    text: text[this.lang],
    comment: this.props.comment,
    userId: undefined,
    deleteValidation: false,
    wantedToDeleteReply: undefined,
    deleteLoading: false,
    error: undefined,
  };

  wantToDelete = (reply) => {
    this.setState({ wantedToDeleteReply: reply, deleteValidation: true });
  };

  triggerDelete = () => {
    this.setState({ deleteValidation: !this.state.deleteValidation });
  };

  deleteReply = async (reply) => {
    this.setState({ deleteLoading: true });
    await CommentsService.deleteReply(this.props.comment, reply)
      .then(() => {
        this.setState({ deleteLoading: false });
      })
      .catch(() => {
        this.setState({ deleteLoading: false });
        this.setState({ error: "this.state.text.errors.error_delete" });
      });
    this.props.refreshArticle();
  };

  render() {
    const {
      text,
      comment,
      userId,
      deleteValidation,
      wantedToDeleteReply,
      error,
    } = this.state;
    return (
      <div>
        Composant d'affichage des réponses
        {comment.replies.map((reply) => (
          <div key={reply.id} style={{ marginLeft: "10px" }}>
            {reply.reply_author.username}: {reply.reply_text}
            {reply.reply_author.id === userId ? (
              <button onClick={() => this.wantToDelete(reply)}>
                Supprimer
              </button>
            ) : undefined}
            {deleteValidation && wantedToDeleteReply.id === reply.id ? (
              <ArticleCommentReplyDeleteValidation
                deleteComment={this.deleteReply}
                trigger={this.triggerDelete}
                comment={reply}
              />
            ) : undefined}
            {error && wantedToDeleteReply.id === reply.id ? (
              <p>{error}</p>
            ) : undefined}
          </div>
        ))}
      </div>
    );
  }
}

export default ArticlesListReplies;
