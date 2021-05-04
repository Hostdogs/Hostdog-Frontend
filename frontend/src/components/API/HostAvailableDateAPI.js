import axios from "axios";
const API_URL = "https://hostdog-backend.herokuapp.com/api/profilehost/";

export default class HostAvailableDateAPI {
  static AddHostAvailableDate(mytoken, host_id, date) {
    const url = `${API_URL}${host_id}/available-date/`;
    return axios.post(url, date, {
      headers: {
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static GetHostAvailableDate(mytoken, host_id) {
    const url = `${API_URL}${host_id}/available-date/`;
    return axios.get(url, {
      headers: {
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static DeleteHostAvailableDate(mytoken, host_id, date_id) {
    const url = `${API_URL}${host_id}/available-date/${date_id}/`;
    return axios.delete(url, {
      headers: {
        Authorization: `Token ${mytoken}`,
      },
    });
  }
}
