import axiosInstance from "./axiosApi";


class ImageService {
  static async uploadImage(formData, name, alt){
    let result;
    await axiosInstance.post('/images/', formData, {headers: {"Content-Type": "multipart/form-data"}}).then(async r => {
      await axiosInstance.patch(`/images/${r.data.id}/`, {name: name, alt: alt}).then(r => {
        result = r.data;
      })
    })
    return result
  }
}

export default ImageService;
