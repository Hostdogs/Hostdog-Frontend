import axios from 'axios'
const API_URL = "localhost:8000/"

export default class LoginAPI{

    static Login(username,password){
        const url = `${API_URL}api/token/`;
        return axios.post(url,{ "username":username, "password":password });
    }
}