import axiosInstance from "./axiosApi";
import UserModule from "./UserModule";

class CommentsService{
  static async createComment(comment){
    let response;
    await axiosInstance.post('/comments/', comment).then(r => {
      response =  r.data
    }).catch(err => {
      console.log(err)
    })
    return response;
  }
}

export default CommentsService;
