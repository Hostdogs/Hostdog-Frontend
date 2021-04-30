import axios from "axios";
import React, { Component } from "react";
const API_URL = "http://127.0.0.1:8000/api/profilecustomer/";
export default class APIDog {
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
}
