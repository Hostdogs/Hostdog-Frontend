import axios from "axios";
const API_URL = "http://127.0.0.1:8000/";

export default class CustomerAPI {
    static ProfileInitCustomer(
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
        const url = `${API_URL}api/profilecustomer/`;
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
}