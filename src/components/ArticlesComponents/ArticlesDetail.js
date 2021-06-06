import React from "react";
import {UserContext} from "../../context";
import text from "../../assets/texts/articles.json";
import ArticlesModule from "../../ArticlesModule";
import ArticleDisplay from "./ArticleDisplay";
import {Redirect} from "react-router-dom";

class ArticlesDetail extends React.Component{
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
    article: {},
    error: ''
  }

  async componentDidMount() {
    let slug = this.props.location.pathname.split('/')
    slug = slug[slug.length -1]
    const article = await ArticlesModule.getArticleBySlug(slug).catch(error => {
      this.setState({error: error})
    })
    this.setState({article: article})
  }

  render() {
    const { text, article } = this.state;
    return (
      <div>
        {article ? <ArticleDisplay article={article}/> : <Redirect to={'/articles/'}/>}
      </div>
    );
  }
}

export default ArticlesDetail;
