import axios from "axios";
import React, { Component } from "react";
const API_URL = "http://127.0.0.1:8000/api/dogs/";
export default class APIDog {
  static UpdateDog(dog_id, body) {
    const url = `${API_URL}${dog_id}/`;
    return axios.put(url, body);
  }
  static AddDog(body) {
    const url = API_URL;
    return axios.post(url, body);
  }
}
