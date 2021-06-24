import React from "react";
import { UserContext } from "../../context";
import text from "../../assets/texts/articles/articles.json";
import { Link } from "react-router-dom";

class ArticleBox extends React.Component {
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
    article: this.props.article,
  };

  render() {
    const { text, article } = this.state;
    return (
      <div>
        <p>{article.title}</p>
        <Link to={`/articles/${article.slug}`}>{text.read_more}</Link>
      </div>
    );
  }
}

export default ArticleBox;
