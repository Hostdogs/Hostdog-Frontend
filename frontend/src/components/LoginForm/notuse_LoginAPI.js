import axios from 'axios'
const API_URL = "localhost:8000/"

export default class LoginAPI{

    createLogin(username,password){
        const url = `${API_URL}api/token/`;
        return axios.post(url,{ "username":username, "password":password });
    }
}