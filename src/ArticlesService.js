import axiosInstance from "./axiosApi";
import UserModule from "./UserModule";
import CommentsService from "./CommentsService";

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
      if (error.status === 404){
        let err = new Error('404').message = 'not found'
        throw err;
      }
      throw Object.assign(new Error(error));
    })
    return response
  }

  static async addComment(article, comment){
    comment['author'] = UserModule.getUserData().id;
    comment['replies'] = [];
    let response;
    let comments = [];
    for (let comment of article.comments){
      comments.push(comment.id);
    }

    await CommentsService.createComment(comment).then(async r => {
      comment = r;
      comments.push(comment.id);
      await axiosInstance.put(`/update/articles_comments/${article.id}/`, {comments: comments}).then(r => {
        response = r.data;
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
    return response;
  }

  static async deleteComment(article, comment){
    let response;
    article.comments = article.comments.filter(actComment => actComment.id !== comment.id);
    let commentsIds = [];
    for (let comment of article.comments){
      commentsIds.push(comment.id);
    }
    await axiosInstance.put(`/articles/${article.id}/`, {comments: commentsIds}).then(r => {
      response = r.data;
    }).catch(err => {
      console.log(err);
    })
    return response;
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
