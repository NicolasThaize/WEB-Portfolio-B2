import React from "react";
import ArticlesModule from "../../ArticlesService";
import { UserContext } from "../../context";
import text from "../../assets/texts/articles/articles.json";
import ArticleBox from "./ArticleBox";

class Articles extends React.Component {
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
    articles: [],
    error: "",
    loading: false
  };
  async componentDidMount() {
    this.setState({loading: true})
    ArticlesModule.getAllPublicArticles()
      .then((r) => {
        this.setState({loading: false})
        this.setState({ articles: r });
      })
      .catch(() => {
        this.setState({loading: false})
        this.setState({ error: this.state.text.errors.retreviewing_articles });
      });
  }

  render() {
    const { error, articles, loading } = this.state;
    return (
      <div>
        {error ? <p>{error}</p> : undefined}
        {loading ? <p>Loading</p> : undefined}
        {articles.map((article) => (
          <div key={article.id}>
            <ArticleBox article={article} />
          </div>
        ))}
      </div>
    );
  }
}

export default Articles;
