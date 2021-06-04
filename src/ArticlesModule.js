import axiosInstance from "./axiosApi";

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
   * Axios request to update specific article
   * @param id
   * @param values
   * @returns {Promise<*>}
   */
  static async updateArticle(id, values) {
    let response;
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
}

export default ArticlesModule;
