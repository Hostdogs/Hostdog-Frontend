import axios from "axios";
import React, { Component } from "react";
const API_URL = "http://127.0.0.1:8000/api/dogs/";
export default class APIDog {
  static UpdateDog(dog_id, data) {
    const url = `${API_URL}${dog_id}/`;
    return axios.patch(url, data);
  }

  static AddDog(data) {
    const url = API_URL;
    return axios.post(url, data);
  }

  static UploadImgDog(dog_id, data) {
    const url = `${API_URL}${dog_id}/`;
    return axios.patch(url, data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  }

  static DeleteDog(dog_id) {
    const url = `${API_URL}${dog_id}/`;
    return axios.delete(url);
  }
}
