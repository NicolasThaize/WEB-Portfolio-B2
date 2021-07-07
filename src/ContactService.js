import axiosInstance from "./axiosApi";

class ContactService {
  static async sendContactEmail(data){
    let response;
    axiosInstance.get('send_contact_email/', data).then(r => {
      response = r.data;
    })
    return response;
  }
}

export default ContactService;
