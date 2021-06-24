import React from "react";
import {UserContext} from "../../context";
import text from "../../assets/texts/articles/articles.json";
import ArticlesModule from "../../ArticlesService";
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
    error: '',
    redirect: false
  }

  async componentDidMount() {
    let slug = this.props.location.pathname.split('/')
    slug = slug[slug.length -1]
    const article = await ArticlesModule.getArticleBySlug(slug).catch(error => {
      if (error === 'not found'){
        return this.setState({redirect: true})
      }
      this.setState({error: error})
    })
    this.setState({article: article})
  }

  refreshArticle = async () => {
    const article = await ArticlesModule.getArticleById(this.state.article.id).catch(error => {
      if (error === 'not found'){
        return this.setState({redirect: true})
      }
      this.setState({error: error})
    })
    this.setState({article: article})
  }

  render() {
    const { text, article, redirect } = this.state;
    return (
      <div>
        {redirect ? <Redirect to={'/articles/'}/> : undefined }
        {'id' in article ? <ArticleDisplay article={article} refreshArticle={this.refreshArticle}/> : undefined }
      </div>
    );
  }
}

export default ArticlesDetail;
