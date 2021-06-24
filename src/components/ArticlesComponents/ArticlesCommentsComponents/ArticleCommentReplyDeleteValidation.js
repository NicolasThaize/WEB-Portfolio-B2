import React from "react";
import { UserContext } from "../../../context";
import text from "../../../assets/texts/articles/writeComment.json";

class ArticleCommentReplyDeleteValidation extends React.Component {
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

  deleteAndClose = async () => {
    await this.props.deleteComment(this.props.comment);
    this.props.trigger();
  };

  render() {
    const { text } = this.state;
    return (
      <div>
        <p>{text.delete_comment.message}</p>
        <button onClick={this.deleteAndClose}>
          {text.delete_comment.delete}
        </button>
        <button onClick={this.props.trigger}>
          {text.delete_comment.cancel}
        </button>
      </div>
    );
  }
}

export default ArticleCommentReplyDeleteValidation;
