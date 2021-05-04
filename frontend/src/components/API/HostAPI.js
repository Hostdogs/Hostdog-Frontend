import axios from "axios";
const API_URL = "https://hostdog-backend.herokuapp.com/api/";

export default class HostAPI {
  static ProfileInitHost(profileId, data, mytoken) {
    const url = `${API_URL}profilehost/${profileId}/?all=1`;
    return axios.patch(url, data, {
      headers: {
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static getHostInformation(
    mytoken,
    distance,
    stDate,
    endDate,
    latitude,
    longitude
  ) {
    const url = `${API_URL}profilehost/?latitude=${latitude}&longitude=${longitude}&distance=${distance}&date_full_range=${stDate}&date_full_range=${endDate}`;
    return axios.get(url, {
      headers: {
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static getHostDetails(mytoken, host_id) {
    const url = `${API_URL}profilehost/${host_id}/?all=1`;
    return axios.get(url, {
      headers: {
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static setHostInfo(mytoken, host_id, data) {
    const url = `${API_URL}profilehost/${host_id}/?all=1`;
    return axios.patch(url, data, {
      headers: {
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static AddHostImg(mytoken, host_id, pic) {
    const url = `${API_URL}profilehost/${host_id}/?all=1`;
    return axios.patch(url, pic, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Token ${mytoken}`,
      },
    });
  }
}
