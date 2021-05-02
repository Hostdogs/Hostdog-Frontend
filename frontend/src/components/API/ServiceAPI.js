import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api/service/services/";

export default class ServiceAPI {
    static getService(mytoken,service_id){
        const url=`${API_URL}${service_id}/`;
        return axios.get(url,{
            headers: {
              "content-type": "application/json",
              Authorization: `Token ${mytoken}`,
            },
          });

    }
    static createService(mytoken,data){
        const url =API_URL
        return axios.post(url,data,{
            headers: {
              "content-type": "application/json",
              Authorization: `Token ${mytoken}`,
            },
          });
    }

}