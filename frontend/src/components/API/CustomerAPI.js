import axios from "axios";
const API_URL = "https://hostdog-backend.herokuapp.com/api/";

export default class CustomerAPI {
  static ProfileInitCustomer(profileId, data, mytoken) {
    const url = `${API_URL}profilecustomer/${profileId}/`;
    return axios.patch(url, data, {
      headers: {
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static getCustomerDetails(mytoken, customer_id) {
    const url = `${API_URL}profilecustomer/${customer_id}/`;
    return axios.get(url, {
      headers: {
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static setCustomerInfo(mytoken, customer_id, data) {
    const url = `${API_URL}profilecustomer/${customer_id}/`;
    return axios.patch(url, data, {
      headers: {
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static AddCustomerImg(mytoken, customer_id, pic) {
    const url = `${API_URL}profilecustomer/${customer_id}/?all=1`;
    return axios.patch(url, pic, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Token ${mytoken}`,
      },
    });
  }
}
