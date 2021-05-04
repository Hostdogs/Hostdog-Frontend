import axios from "axios";
const API_URL = "https://hostdog-backend.herokuapp.com/api/profilehost/";

export default class HostServiceAPI {
  static UpdateHostService(mytoken, user_id, data) {
    const url = `${API_URL}${user_id}/host-service/${user_id}/`;
    return axios.patch(url, data, {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static getHostService(mytoken, user_id) {
    const url = `${API_URL}${user_id}/host-service/${user_id}/`;
    return axios.get(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${mytoken}`,
      },
    });
  }
}
