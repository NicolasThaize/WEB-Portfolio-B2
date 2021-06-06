import axiosInstance from "./axiosApi";
import UserModule from "./UserModule";

class ArticlesModule {
  /**
   * Axios request wich returns all articles objects
   * @returns {Promise<*>}
   */
  static async getAllArticles() {
    let response;
    await axiosInstance.get('/articles/').then(r => {
      response = r.data;
    }).catch(error => {
      throw Object.assign(new Error(error));
    })
    return response;
  }

  /**
   * Axios request wich returns all publiv articles objects
   * @returns {Promise<*>}
   */
  static async getAllPublicArticles() {
    let response;
    await axiosInstance.get('/public_articles/').then(r => {
      response = r.data;
    }).catch(error => {
      throw Object.assign(new Error(error));
    })
    return response;
  }

  /**
   * Axios request to update specific article
   * @param id
   * @param values
   * @returns {Promise<*>}
   */
  static async updateArticle(id, values) {
    let response;
    values = checkFields(values)
    values.slug = returnSlug(values)
    await axiosInstance.patch(`/articles/${id}/`, values).then(r => {
      response = r.data
    }).catch(error => {
      throw Object.assign(new Error(error));
    })
    return response
  }

  /**
   * Axios request to delete a specific article
   * @param article
   * @returns {Promise<*>}
   */
  static async deleteArticle(article){
    let response;
    await axiosInstance.delete(`/articles/${article.id}/`).then(r => {
      response = r.data
    }).catch(error => {
      throw Object.assign(new Error(error));
    })
    return response
  }

  /**
   * Axios request to create an article
   * @param article
   * @returns {Promise<*>}
   */
  static async createArticle(article){
    let response;
    article.slug = returnSlug(article)
    article.author = UserModule.getUserData().username
    article = checkFields(article)

    await axiosInstance.post(`/articles/`, article).then(r => {
      response = r.data
    }).catch(error => {
      throw Object.assign(new Error(error));
    })
    return response
  }

  /**
   * Axios request to get a specific article
   * @param slug
   * @returns {Promise<void>}
   */
  static async getArticleBySlug(slug){
    let response;
    await axiosInstance.get(`/public_articles/${slug}/`).then(r => {
      response = r.data
    }).catch(error => {
      throw Object.assign(new Error(error));
    })
    return response
  }
}

function returnSlug(article){
  let str = article.title;
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  let from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  let to   = "aaaaeeeeiiiioooouuuunc------";
  for (let i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes
  return str;
}

function checkFields(article){
  if (!article.images) article.images = []
  if (!article.comments) article.comments = []
  if (!article.categories) article.categories = []
  if (!article.sanitized_html) article.sanitized_html = ""
  if (!article.title) article.title = ""
  if (article.is_public === undefined) article.is_public = false
  return article
}

export default ArticlesModule;
