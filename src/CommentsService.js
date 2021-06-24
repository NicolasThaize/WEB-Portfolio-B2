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


  static async createReply(reply){
    let response;
    await axiosInstance.post('/replies/', reply).then(r => {
      response =  r.data
    }).catch(err => {
      console.log(err)
    })
    return response;
  }



  static async addReply(comment, reply){
    reply['reply_author'] = UserModule.getUserData().id;
    let response;
    let replies = [];
    for (let reply of comment.replies){
      replies.push(reply.id);
    }

    await CommentsService.createReply(reply).then(async r => {
      reply = r;
      replies.push(reply.id);
      await axiosInstance.put(`/update/comments_replies/${comment.id}/`, {replies: replies}).then(r => {
        response = r.data;
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
    return response;
  }
}

export default CommentsService;
