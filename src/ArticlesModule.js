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

  static async updateArticle(id, values) {
    let response;
    await axiosInstance.put(`/articles/${id}/`, values).then(r => {
      response = r.data
    }).catch(error => {
      throw Object.assign(new Error(error));
    })
    return response
  }
}

export default ArticlesModule;
