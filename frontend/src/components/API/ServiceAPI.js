import axios from "axios";
const API_URL = "https://hostdog-backend.herokuapp.com/api/service/services/";

export default class ServiceAPI {
  static getService(mytoken, service_id) {
    const url = `${API_URL}${service_id}/`;
    return axios.get(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${mytoken}`,
      },
    });
  }
  static createService(mytoken, data) {
    const url = API_URL;
    return axios.post(url, data, {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static getAllPending(mytoken) {
    const url = `${API_URL}?main_status=pending`;
    return axios.get(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${mytoken}`,
      },
    });
  }
  static responseService(mytoken, service_id, data) {
    const url = `${API_URL}${service_id}/response/`;
    return axios.post(url, data, {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${mytoken}`,
      },
    });
  }
  static listService(mytoken) {
    const url = `${API_URL}`;
    return axios.get(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${mytoken}`,
      },
    });
  }
}
