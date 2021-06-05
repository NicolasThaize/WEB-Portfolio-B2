import React from "react";
import {UserContext} from "../../../context";
import text from "../../../assets/texts/admin/articles.json";
import ArticlesModule from "../../../ArticlesModule";
import Pagination from "../Pagination";
import ShowModal from "../ShowModal";
import ModifyModal from "../ModifyModal";
import CategoriesModule from "../../../CategoriesModule";
import CreateModal from "../CreateModal";

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
    isCreate: false,
    selectedArticle: '',
    categories: [],
    loading: false
  }

  toggleLoading = () => {
    this.setState({loading: this.state.loading})
  }

  /**
   * After mount get all articles and set it to 'articles'
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    this.toggleLoading()
    await ArticlesModule.getAllArticles().then(r => {
      this.setState({articles: r});
    }).catch(() => {
      this.setState({error: text.errors.get_articles});
    })
    await CategoriesModule.getAllCategories().then(r => {
      this.setState({categories: r})
      this.toggleLoading()
    }).catch(() => {
      this.setState({error: text.errors.get_categories});
    })
  }

  getAllArticles = async () => {
    this.toggleLoading()
    await ArticlesModule.getAllArticles().then(r => {
      this.setState({articles: r});
      this.toggleLoading()
    }).catch(() => {
      this.setState({error: text.errors.get_articles});
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
    let categories = [];
    for (const category of article.categories){
      categories.push(category.id);
    }
    article.categories = categories;
    this.toggleLoading()
    await ArticlesModule.updateArticle(article.id, article).then(() => {
      this.toggleLoading()
      this.triggerModify();
      this.getAllArticles();
    }).catch(() => {
      this.setState({error: text.errors.update_article});
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////

  createFunc = () => {
    this.setState({selectedArticle: {}}, () => {
      this.triggerCreate();
    });
  }
  triggerCreate = () => {
    this.setState({isCreate: !this.state.isCreate});
  }
  apiCreate = async (article) => {
    let categories = [];
    for (const category of article.categories){
      categories.push(category.id);
    }
    article.categories = categories;
    this.toggleLoading()
    await ArticlesModule.createArticle(article).then(() => {
      this.toggleLoading()
      this.triggerCreate();
      this.getAllArticles();
    }).catch(() => {
      this.setState({error: text.errors.create_article});
    })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////

  deleteFunc = (article) => {
    this.toggleLoading()
    ArticlesModule.deleteArticle(article).then(() => {
      this.toggleLoading()
      this.getAllArticles();
    }).catch(() => {
      this.setState({error: text.errors.delete_article});
    })
  }


  render() {
    const { text, articles, error, isShown, selectedArticle, isModify, categories, loading, isCreate } = this.state;
    return (
      <div>
        {error ? <p>{error}</p> : undefined}
        {loading ? <p>{loading}</p> : undefined}
        <button type='button' onClick={this.triggerCreate}>{text.buttons.create}</button>
        { articles.length > 0 ?
          <Pagination
            array={articles}
            fields={text.fields}
            crud={{show: this.showFunc, modify: this.mofifyFunc, delete: this.deleteFunc}}
          /> : <p>{text.no_article}</p> }
        { isShown ? <ShowModal selected={selectedArticle} toggle={this.triggerShow} fields={text.all_fields}/> : undefined}
        { isCreate ?
          <CreateModal
            selected={selectedArticle}
            toggle={this.triggerCreate}
            fields={text.all_fields}
            multiSelectValues={categories}
            returnToParent={this.apiCreate}
          /> : undefined}
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
