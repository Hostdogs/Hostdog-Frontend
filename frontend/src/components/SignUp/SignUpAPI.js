import axios from 'axios'
const API_URL = "http://127.0.0.1:8000/"

export default class SignUpAPI{

    static checkDuplicate(username,password,email,is_host){
        const url = `${API_URL}api/accounts/#`;
        return axios.post(url,{ username,password,is_host,email });
    }

    static ProfileInitCustomer(account,first_name,last_name,gender,mobile,dob,address,latitude,longitude){
        const url = `${API_URL}api/profilecustomer/`;
        return axios.patch(url,{account,first_name,last_name,gender,mobile,dob,address,latitude,longitude})
    }

    static ProfileInitHost(account,first_name,last_name,gender,mobile,dob,address,latitude,longitude){
        const url = `${API_URL}api/profilehost/`;
        return axios.patch(url,{account,first_name,last_name,gender,mobile,dob,address,latitude,longitude})
    }
    
    static checkInformation(Information){
        var response = {}
        if(Information.first_name.length<=1){
            response.first_name = "ตัวอักษรน้อยเกินไป"
        }
        return response
    }

    static fakeSignup(username,password){
        return username+password
    }
}