import axiosInstance from "./axiosApi";

class CategoriesModule{
  /**
   * Axios request and returns array of all categories
   * @returns {Promise<*[]>}
   */
  static async getAllCategories(){
    let response = []
    await axiosInstance.get('/categories').then(r => {
      response = r.data
    }).catch(error => {
      throw Object.assign(new Error(error));
    })
    return response
  }

  /**
   * Axios request and returns array of ids of all categories
   * @returns {Promise<*[]>}
   */
  static async getAllCategoriesIds(){
    let response = []
    await axiosInstance.get('/categories').then(r => {
      for (const category of r.data){
        response.push(category.id)
      }
    }).catch(error => {
      throw Object.assign(new Error(error));
    })
    return response
  }
}

export default CategoriesModule

