import axios from 'axios'
import moment from 'moment'
const API_URL = "127.0.0.1:8000/"

export default class ContentAPI {


    // static fakeGetHostInformation(order) {
    //     return new Promise((resolve, reject) => {

    //         resolve(testHost)

    //     })
    // }

    // static getHostInformation(mytoken, distance, arearange, stDate,endDate,latitude,longitude) {
    //     const url = `${API_URL}api/profilehost/?latitude=${latitude}&longitude=${longitude}&distance=${distance}&arearange=${arearange[0]}&arearange=${arearange[1]}&date_full_range=${stDate}&date_full_range=${endDate}`;
    //     return axios.get(url, {
    //         headers: {
    //             'Authorization': `Token ${mytoken}`
    //         }
    //     });
    // }

}