import axios from 'axios'
const API_URL = "https://jsonplaceholder.typicode.com/"

export default class ProfileAPI{

    static fakeProfile(userid){
        const url = `${API_URL}users/${userid}`;
        return axios.get(url)
    }
}