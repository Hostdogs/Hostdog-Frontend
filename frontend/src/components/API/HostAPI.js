import axios from "axios";
const API_URL = "http://127.0.0.1:8000/";

export default class HostAPI {
    
    static ProfileInitHost(
        account,
        first_name,
        last_name,
        gender,
        mobile,
        dob,
        address,
        latitude,
        longitude
    ) {
        const url = `${API_URL}api/profilehost/`;
        return axios.patch(url, {
            account,
            first_name,
            last_name,
            gender,
            mobile,
            dob,
            address,
            latitude,
            longitude,
        });
    }

    static getHostInformation(mytoken, distance, arearange, stDate, endDate, latitude, longitude) {
        const url = `${API_URL}api/profilehost/?latitude=${latitude}&longitude=${longitude}&distance=${distance}&arearange=${arearange[0]}&arearange=${arearange[1]}&date_full_range=${stDate}&date_full_range=${endDate}`;
        return axios.get(url, {
            headers: {
                'Authorization': `Token ${mytoken}`
            }
        });
    }
}