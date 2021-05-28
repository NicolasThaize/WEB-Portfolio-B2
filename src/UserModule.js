import jwt from 'jwt-decode';
import axiosInstance from "./axiosApi";

class UserModule {
  static getUserData() {
    try {
      const decoded = jwt(localStorage.getItem('nthaize_access_token'));
      if (decoded.email === undefined){
        return undefined
      }
      if (!!decoded){
        return ({
          email: decoded.email,
          first_name: decoded.first_name,
          id: decoded.id,
          last_name: decoded.last_name,
          username: decoded.username,
          birth_date: decoded.birth_date,
          admin: decoded.admin
        });
      }
    } catch (e) {
      return undefined
    }
  }

  static async loginUser ({password, username}) {
    let response;
    await axiosInstance.post(`/token/obtain/`, {username: username, password: password}).then(r => {
      response =  r.data;
    }).catch(error => {
      switch (error.detail){
        case 'No active account found with the given credentials':
            throw Object.assign(new Error("401"));
          default:
            throw Object.assign(new Error("unknown"));
      }
    })
    return response;
  }

  static async registerUser ({password, username, email}) {
    await axiosInstance.post(`/users/`, {username: username, password: password, email: email}).then(r => {
      return r.data
    }).catch(error => {
      console.log(error)
    })
  }

}

export default UserModule;
