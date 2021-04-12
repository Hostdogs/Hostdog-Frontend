import axios from 'axios'
const url = "localhost:8000/"

export default function LoginAPI(username,password) {
    axios.post(url+"api/token",{"username":username,"password":password})
}
