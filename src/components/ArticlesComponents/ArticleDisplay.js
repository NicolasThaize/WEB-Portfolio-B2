import React from "react";
import ArticlesComments from "./ArticlesCommentsComponents/ArticlesComments";
import text from "../../assets/texts/articles/articles.json";
import { UserContext } from "../../context";

class ArticleDisplay extends React.Component {
  static contextType = UserContext;
  lang = this.context.language;
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.context.language !== this.lang) {
      this.lang = this.context.language;
      this.setState({ text: text[this.context.language] });
    }
  }

  state = {
    article: this.props.article,
    text: text[this.lang],
  };

  static getDerivedStateFromProps(props, state) {
    return (state.article = props.article);
  }

  render() {
    const { article } = this.state;
    return (
      <div>
        {article.title}
        <div
          dangerouslySetInnerHTML={{
            __html: article.sanitized_html,
          }}
        />
        <ArticlesComments
          article={article}
          refreshArticle={this.props.refreshArticle}
        />
      </div>
    );
  }
}

export default ArticleDisplay;
