import axios from "axios";
const API_URL = "http://127.0.0.1:8000/";

export default class LoginAPI {
  static Login(username, password) {
    const url = `${API_URL}api/token/`;
    return axios.post(url, { username: username, password: password });
  }

  // static fakeLogin(username,password){
  //     return username+password
  // }
}
