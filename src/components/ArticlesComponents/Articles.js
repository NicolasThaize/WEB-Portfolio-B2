import React from "react";
import ArticlesModule from "../../ArticlesModule";

class Articles extends React.Component{
  state = {
    articles: [],
    error: ''
  }

  async componentDidMount() {
    ArticlesModule.getAllPublicArticles().then(r => {
      this.setState({articles: r})
    }).catch(error => {
      this.setState({error: 'Error while retreviewing articles'})
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
