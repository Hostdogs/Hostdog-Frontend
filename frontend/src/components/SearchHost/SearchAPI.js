import axios from 'axios'
import moment from 'moment'
const API_URL = "https://jsonplaceholder.typicode.com/"


const testHost = {
    3: {
        userid: 3,
        name: "พลแพท",
        surname: "จงวัฒนศิริ",
        host_bio: "เสือก ไม่ร้องนะคับ",
        date_joined: "2021-04-23",
        last_login: "2021-04-24 21:15:28",
        dob:"1999-02-12",
        gender:"female",
        picture:"https://randomuser.me/api/portraits/women/1.jpg"
    }, 4: {
        userid: 4,
        name: "แพทย์ภูมิ",
        surname: "หาแก้ว",
        host_bio: "เห้ย",
        date_joined: "2021-04-24",
        last_login: "2021-04-24 15:35:20",
        dob:"1996-02-29",
        gender:"male",
        picture:"https://randomuser.me/api/portraits/men/5.jpg"
    }
}
export default class SearchAPI {

    // static fakeProfile(userid){
    //     const url = `${API_URL}users/${userid}`;
    //     return axios.get(url)
    // }

    static fakeCustomerProfile(userid) {
        return new Promise((resolve, reject) => {
            if(testCustomer[userid]){
                resolve(testCustomer[userid])
            }else{
                reject("404: Customer not Found")
            }
            
        })
    }

    static fakeHostProfile(userid) {
        return new Promise((resolve, reject) => {
            if(testHost[userid]){
                resolve(testHost[userid])
            }else{
                reject("404: Host not Found")
            }
            
        })
    }

    static fakeisOwned(userid,cookies){
        return new Promise((resolve,reject)=>{
            if(userid===cookies){
                resolve({
                    status:"200"
                })
            }else{
                resolve({
                    status:"401"
                })
            }
        })
    }


}