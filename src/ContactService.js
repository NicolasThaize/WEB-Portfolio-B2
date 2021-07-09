import axiosInstance from "./axiosApi";

class ContactService {
  static async sendContactEmail(data){
    let response;
    await axiosInstance.get('send_contact_email/', data).then(r => {
      response = r.data;
    }).catch((error) => {
      throw Object.assign(new Error(error));
    });
    return response;
  }
}

export default ContactService;
