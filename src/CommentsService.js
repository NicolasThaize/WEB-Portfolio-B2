import axiosInstance from "./axiosApi";
import UserModule from "./UserModule";

class CommentsService {
  /**
   * Axios request to create a article
   * @param comment
   * @returns {Promise<*>}
   */
  static async createComment(comment) {
    let response;
    await axiosInstance
      .post("/comments/", comment)
      .then((r) => {
        response = r.data;
      })
      .catch((err) => {
        throw Object.assign(new Error(err));
      });
    return response;
  }

  /**
   * Axios request to create a reply
   * @param reply
   * @returns {Promise<*>}
   */
  static async createReply(reply) {
    let response;
    await axiosInstance
      .post("/replies/", reply)
      .then((r) => {
        response = r.data;
      })
      .catch((err) => {
        throw Object.assign(new Error(err));
      });
    return response;
  }

  /**
   * Axios request to create a reply and add it to a comment
   * @param comment
   * @param reply
   * @returns {Promise<*>}
   */
  static async addReply(comment, reply) {
    reply["reply_author"] = UserModule.getUserData().id;
    let response;
    let replies = [];
    for (let reply of comment.replies) {
      replies.push(reply.id);
    }

    await CommentsService.createReply(reply)
      .then(async (r) => {
        reply = r;
        replies.push(reply.id);
        await axiosInstance
          .put(`/update/comments_replies/${comment.id}/`, { replies: replies })
          .then((r) => {
            response = r.data;
          })
          .catch((err) => {
            throw Object.assign(new Error(err));
          });
      })
      .catch((err) => {
        throw Object.assign(new Error(err));
      });
    return response;
  }

  /**
   * Axios request to delete a reply of a comment (does not delete the reply of db)
   * @param comment
   * @param reply
   * @returns {Promise<*>}
   */
  static async deleteReply(comment, reply) {
    let response;
    let newReplies = comment.replies.filter(
      (comReply) => comReply.id !== reply.id
    );
    let repliesIds = [];
    for (let reply of newReplies) {
      repliesIds.push(reply.id);
    }
    await axiosInstance
      .put(`/comments/${comment.id}/`, { replies: repliesIds })
      .then((r) => {
        response = r.data;
      })
      .catch((err) => {
        throw Object.assign(new Error(err));
      });
    return response;
  }
}

export default CommentsService;
