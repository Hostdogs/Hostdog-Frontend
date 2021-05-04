import axios from "axios";
const API_URL = "https://hostdog-backend.herokuapp.com/api/";

export default class AuthenAPI {
  static Login(username, password) {
    const url = `${API_URL}token/`;
    return axios.post(url, { username: username, password: password });
  }

  static initSignUp(data) {
    const url = `${API_URL}accounts/`;
    return axios.post(url, data);
  }

  static getUserAllInfo(mytoken, user_id) {
    const url = `${API_URL}accounts/${user_id}/`;
    return axios.get(url, {
      headers: {
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static changePassword(mytoken, user_id, old_password, new_password) {
    const url = `${API_URL}accounts/${user_id}/change-password/`;
    return axios.post(
      url,
      { old_password, new_password },
      {
        headers: {
          Authorization: `Token ${mytoken}`,
        },
      }
    );
  }
}
