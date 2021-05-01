import axios from 'axios'
import moment from 'moment'
const API_URL = "127.0.0.1:8000/"


const testHost = [
    // {
    //     userid: 1,
    //     name: "สมหญิง",
    //     surname: "จิงจิงนะ",
    //     host_bio: "เสือก ไม่ร้องนะคับ",
    //     date_joined: "2021-04-23",
    //     last_login: "2021-04-24 21:15:28",
    //     dob: "1999-02-12",
    //     gender: "female",
    //     picture: "https://randomuser.me/api/portraits/women/21.jpg",
    //     displace: 100,
    //     host_hosted_count: 20,
    //     host_rating:"4.5",
    //     host_area:40
    // }, {
    //     userid: 2,
    //     name: "สมชาย",
    //     surname: "สบายดี",
    //     host_bio: "เห้ย",
    //     date_joined: "2021-04-24",
    //     last_login: "2021-04-24 15:35:20",
    //     dob: "1996-02-29",
    //     gender: "male",
    //     picture: "https://randomuser.me/api/portraits/men/10.jpg",
    //     displace: 900,
    //     host_hosted_count: 14,
    //     host_rating:"3.5",
    //     host_area:35
    // }, 
    {
        userid: 3,
        name: "ลิขิตพร",
        surname: "ลิขิตงาม",
        host_bio: "สวัสดีค่ะ",
        date_joined: "2021-04-23",
        last_login: "2021-04-24 21:15:28",
        dob: "1999-02-12",
        gender: "female",
        picture: "https://randomuser.me/api/portraits/women/35.jpg",
        displace: 1000,
        host_hosted_count: 55,
        host_rating: 4.8,
        host_area: 40
    }, {
        userid: 4,
        name: "แพทย์ภูมิ",
        surname: "หาแก้ว",
        host_bio: "เห้ย",
        date_joined: "2021-04-24",
        last_login: "2021-04-24 15:35:20",
        dob: "1996-02-29",
        gender: "male",
        picture: "https://randomuser.me/api/portraits/men/5.jpg",
        displace: 1500,
        host_hosted_count: 34,
        host_rating: 2.7,
        host_area: 25
    }, {
        userid: 5,
        name: "ลิขวิดพูม",
        surname: "ลิขวิดแงม",
        host_bio: "เห้ย",
        date_joined: "2021-04-24",
        last_login: "2021-04-24 15:35:20",
        dob: "1996-02-29",
        gender: "male",
        picture: "https://randomuser.me/api/portraits/men/35.jpg",
        displace: 7000,
        host_hosted_count: 44,
        host_rating: 3.2,
        host_area: 18
    }, {
        userid: 6,
        name: "คำนวย",
        surname: "รวยเพื่อน",
        host_bio: "เห้ย",
        date_joined: "2021-04-24",
        last_login: "2021-04-24 15:35:20",
        dob: "1996-02-29",
        gender: "male",
        picture: "https://randomuser.me/api/portraits/men/42.jpg",
        displace: 15000,
        host_hosted_count: 2,
        host_rating: 3.0,
        host_area: 18,
    }
]
export default class SearchAPI {


    static fakeGetHostInformation(order) {
        return new Promise((resolve, reject) => {

            resolve(testHost)

        })
    }

    static getHostInformation(mytoken, distance, arearange, stDate,endDate,latitude,longitude) {
        const url = `${API_URL}api/profilehost/?latitude=${latitude}&longitude=${longitude}&distance=${distance}&arearange=${arearange[0]}&arearange=${arearange[1]}&date_full_range=${stDate}&date_full_range=${endDate}`;
        return axios.get(url, {
            headers: {
                'Authorization': `Token ${mytoken}`
            }
        });
    }

}