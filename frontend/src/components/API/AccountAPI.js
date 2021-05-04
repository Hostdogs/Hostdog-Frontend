import axios from "axios";
const API_URL = "https://hostdog-backend.herokuapp.com/api/accounts/";

export default class AccountAPI {
  static getAccount(mytoken, account_id) {
    const url = `${API_URL}${account_id}/`;
    return axios.get(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${mytoken}`,
      },
    });
  }
}
