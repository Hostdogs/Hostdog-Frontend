import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api/profilecustomer/";
export default class DogAPI {
  static UpdateDog(mytoken, user_id, dog_id, data) {
    const url = `${API_URL}${user_id}/dogs/${dog_id}/`;
    return axios.patch(url, data, {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static AddDog(mytoken, user_id, data) {
    const url = `${API_URL}${user_id}/dogs/`;
    return axios.post(url, data, {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static UploadImgDog(mytoken, user_id, dog_id, data) {
    const url = `${API_URL}${user_id}/dogs/${dog_id}/`;
    return axios.patch(url, data, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static DeleteDog(mytoken, user_id, dog_id) {
    const url = `${API_URL}${user_id}/dogs/${dog_id}/`;
    return axios.delete(url, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static GetDog(mytoken, user_id) {
    const url = `${API_URL}${user_id}/dogs/`;
    return axios.get(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static AddFeedingTime(mytoken, user_id, dog_id, data) {
    const url = `${API_URL}${user_id}/dogs/${dog_id}/feeding-time/`;
    return axios.post(url, data, {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static GetFeedingTime(mytoken, user_id, dog_id) {
    const url = `${API_URL}${user_id}/dogs/${dog_id}/feeding-time/`;
    return axios.get(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${mytoken}`,
      },
    });
  }

  static DeleteFeedingTime(mytoken, user_id, dog_id, time_id) {
    const url = `${API_URL}${user_id}/dogs/${dog_id}/feeding-time/${time_id}/`;
    return axios.delete(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${mytoken}`,
      },
    });
  }
}
