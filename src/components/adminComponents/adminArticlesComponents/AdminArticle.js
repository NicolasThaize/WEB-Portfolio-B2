import React from "react";
import {UserContext} from "../../../context";
import text from "../../../assets/texts/admin/articles.json";
import ArticlesModule from "../../../ArticlesModule";
import Pagination from "../Pagination";
import ShowModal from "../ShowModal";
import ModifyModal from "../ModifyModal";
import CategoriesModule from "../../../CategoriesModule";

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
    error: '',
    isShown: false,
    isModify: false,
    isDelete: false,
    selectedArticle: '',
    categories: []
  }

  /**
   * After mount get all articles and set it to 'articles'
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    await ArticlesModule.getAllArticles().then(r => {
      this.setState({articles: r});
    }).catch(() => {
      this.setState({error: text.error.get_articles});
    })
    await CategoriesModule.getAllCategories().then(r => {
      this.setState({categories: r})
    }).catch(() => {
      this.setState({error: text.error.get_categories});
    })
  }

  getAllArticles = async () => {
    await ArticlesModule.getAllArticles().then(r => {
      this.setState({articles: r});
    }).catch(() => {
      this.setState({error: text.error.get_articles});
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////

  showFunc = (article) => {
    this.setState({selectedArticle: article});
    this.triggerShow();
  }
  triggerShow = () => {
    this.setState({isShown: !this.state.isShown});
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////

  mofifyFunc = (article) => {
    this.setState({selectedArticle: article});
    this.triggerModify();
  }
  triggerModify = () => {
    this.setState({isModify: !this.state.isModify});
  }
  apiModify = async (article) => {
    this.setState({updateLoading: true})
    let categories = [];
    for (const category of article.categories){
      categories.push(category.id);
    }
    article.categories = categories;
    await ArticlesModule.updateArticle(article.id, article).then(r => {
      console.log(r)
      this.setState({updateLoading: false})
      this.triggerModify();
      this.getAllArticles();
    }).catch(() => {
      this.setState({error: text.error.update_article});
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////

  deleteFunc = (article) => {
    console.log("delete", article)
  }


  render() {
    const { text, articles, error, isShown, selectedArticle, isModify, categories } = this.state;
    return (
      <div>
        {error ? <p>{error}</p> : undefined}
        { articles.length > 0 ?
          <Pagination
            array={articles}
            fields={text.fields}
            crud={{show: this.showFunc, modify: this.mofifyFunc, delete: this.deleteFunc}}
          /> : <p>{text.no_article}</p> }
        { isShown ? <ShowModal selected={selectedArticle} toggle={this.triggerShow} fields={text.all_fields}/> : undefined}
        { isModify ?
          <ModifyModal
            selected={selectedArticle}
            toggle={this.triggerModify}
            fields={text.all_fields}
            multiSelectValues={categories}
            returnToParent={this.apiModify}
          /> : undefined}
      </div>
    );
  }
}

export default AdminArticle;
