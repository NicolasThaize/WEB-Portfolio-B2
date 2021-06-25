import React from "react";
import { UserContext } from "../../../context";
import text from "../../../assets/texts/articles/writeComment.json";
import ArticlesModule from "../../../ArticlesService";

class ArticlesWriteComment extends React.Component {
  static contextType = UserContext;
  lang = this.context.language;
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.context.language !== this.lang) {
      this.lang = this.context.language;
      this.setState({ text: text[this.context.language] });
    }
  }

  static getDerivedStateFromProps(props, state) {
    return (state.article = props.article);
  }

  state = {
    text: text[this.lang],
    article: this.props.article,
    userInput: "",
    loading: false,
    error: undefined,
  };

  handleChange = (e) => {
    this.setState({ userInput: e.target.value });
  };

  sendComment = () => {
    this.setState({ loading: true });
    ArticlesModule.addComment(this.state.article, {
      text: this.state.userInput,
    })
      .then(() => {
        this.setState({ loading: false, userInput: "" });
        this.props.refreshArticle();
      })
      .catch(() => {
        this.setState({ loading: false });
        this.setState({ error: "Error while sending the comment." });
      });
  };

  resetInput = () => {
    this.setState({ userInput: "" });
  };

  render() {
    const { text, userInput, error, loading } = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="here comment"
          onChange={this.handleChange}
          value={userInput}
        />
        {error ? <p>{error}</p> : undefined}
        <button onClick={this.sendComment}>Envoyer</button>
        <button onClick={this.resetInput}>Annuler</button>
        {loading ? <p>Sending</p> : undefined}
      </div>
    );
  }
}

export default ArticlesWriteComment;
