import axiosInstance from "./axiosApi";

class ArticlesModule {
  static async getAllArticles() {
    let response;
    await axiosInstance.get('/articles/').then(r => {
      response = r.data;
    }).catch(error => {
      throw Object.assign(new Error(error));
    })
    return response;
  }
}

export default ArticlesModule;
