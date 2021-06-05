import React from "react";
import ArticlesModule from "../../ArticlesModule";
import {UserContext} from "../../context";
import text from "../../assets/texts/articles.json";

class Articles extends React.Component{
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
    articles: [],
    error: ''
  }
  async componentDidMount() {
    ArticlesModule.getAllPublicArticles().then(r => {
      this.setState({articles: r})
    }).catch(error => {
      this.setState({error: this.state.text.errors.retreviewing_articles})
    })
  }

  render() {
    const { error, articles } = this.state;
    return (
      <div>
        {error ? <p>{error}</p> : undefined}
        {articles.map(article => (
          article.title
        ))}
        articles
      </div>
    );
  }
}

export default Articles;
