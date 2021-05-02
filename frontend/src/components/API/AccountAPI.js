import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api/accounts/";

export default class AccountAPI{
    static getAccount(mytoken,account_id){
        const url=`${API_URL}${account_id}/`
        return axios.get(url,{
          headers:{
            "content-type":"application/json",
            Authorization:`Token ${mytoken}`,
          },
        });
    }


}