import axios from 'axios'
import moment from 'moment'
const API_URL = "127.0.0.1:8000/"
const fakeIbdata = [
    {service_id:"1", customer_id:"1",dog_id:"1",main_status:"Pending",}
]

export default class InboxAPI {


    static fakeInbox(){
        return new Promise((resolve, reject) =>{
            resolve(fakeIbdata)
        })
    }

    // static getHostInformation(mytoken, distance, arearange, stDate,endDate,latitude,longitude) {
    //     const url = `${API_URL}api/profilehost/?latitude=${latitude}&longitude=${longitude}&distance=${distance}&arearange=${arearange[0]}&arearange=${arearange[1]}&date_full_range=${stDate}&date_full_range=${endDate}`;
    //     return axios.get(url, {
    //         headers: {
    //             'Authorization': `Token ${mytoken}`
    //         }
    //     });
    // }

}