import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api/profilehost/";

export default class HostImgAPI {
  static AddHostImg(mytoken, host_id, data) {
    const url = `${API_URL}${host_id}/house-image/`;
    return axios.post(url, data, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static GetHostImg(mytoken, host_id) {
    const url = `${API_URL}${host_id}/house-image/`;
    return axios.get(url, {
      headers: {
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static DeleteHostImg(mytoken, host_id, pic_id) {
    const url = `${API_URL}${host_id}/house-image/${pic_id}/`;
    return axios.delete(url, {
      headers: {
        Authorization: `Token ${mytoken}`,
      },
    });
  }
}
