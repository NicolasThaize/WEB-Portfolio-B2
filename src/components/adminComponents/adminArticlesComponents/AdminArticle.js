import React from "react";
import {UserContext} from "../../../context";
import text from "../../../assets/texts/admin/articles.json";
import ArticlesModule from "../../../ArticlesModule";
import CrudButtons from "../CrudButtons";

class AdminArticle extends React.Component{
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

  getAllArticles = async () => {
    await ArticlesModule.getAllArticles().then(r => {
      this.setState({articles: r})
    }).catch(() => {
      this.setState({error: text.error.get_articles})
    })
  }

  /**
   * After mount get all articles and set it to 'articles'
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    await ArticlesModule.getAllArticles().then(r => {
      this.setState({articles: r})
    }).catch(() => {
      this.setState({error: text.error.get_articles})
    })
  }

  showFunc = () => {
    console.log('seee')
  }


  render() {
    const { text, articles, error } = this.state;
    return (
      <div>
        {error ? <p>{error}</p> : undefined}
        { articles.map(article => (
          <div key={article.id}>
            {article.sanitized_html}
            {article.author}
          </div>
        ))}
        <CrudButtons showFunc={this.showFunc}/>
      </div>
    );
  }
}

export default AdminArticle;
