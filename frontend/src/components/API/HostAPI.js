import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api/";

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
    arearange,
    stDate,
    endDate,
    latitude,
    longitude
  ) {
    const url = `${API_URL}profilehost/?latitude=${latitude}&longitude=${longitude}&distance=${distance}&area_range=${arearange[0]}&area_range=${arearange[1]}&date_full_range=${stDate}&date_full_range=${endDate}`;
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
}
