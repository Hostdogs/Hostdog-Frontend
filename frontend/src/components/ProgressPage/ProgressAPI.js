import axios from 'axios'
import moment from 'moment'
const API_URL = "https://jsonplaceholder.typicode.com/"

const testCustomer = {
    1: {
        userid: 1,
        first_name: "พลพัฒน์",
        last_name: "สงวนสิริกุล",
        customer_bio: "สวัสดีท่านสมาชิกชมรม",
        date_joined: "2021-04-21",
        last_login: "2021-04-22 21:35:28",
        dob: "2000-11-08",
        gender: "male",
        picture: "https://randomuser.me/api/portraits/men/1.jpg"
    }, 2: {
        userid: 2,
        first_name: "พัทธพล",
        last_name: "จันทร์ชู",
        customer_bio: "คนชอบผี",
        date_joined: "2021-04-22",
        last_login: "2021-04-22 21:35:28",
        dob: "2000-11-08",
        gender: "",
        picture: "https://randomuser.me/api/portraits/men/55.jpg"
    }
}

const testHost = {
    3: {
        userid: 3,
        first_name: "พลแพท",
        last_name: "จงวัฒนศิริ",
        host_bio: "เสือก ไม่ร้องนะคับ",
        date_joined: "2021-04-23",
        last_login: "2021-04-24 21:15:28",
        dob: "1999-02-12",
        gender: "female",
        picture: "https://randomuser.me/api/portraits/women/1.jpg"
    }, 4: {
        userid: 4,
        first_name: "แพทย์ภูมิ",
        last_name: "หาแก้ว",
        host_bio: "เห้ย",
        date_joined: "2021-04-24",
        last_login: "2021-04-24 15:35:20",
        dob: "1996-02-29",
        gender: "male",
        picture: "https://randomuser.me/api/portraits/men/5.jpg"
    }
}
const testDog = {
    1:{
        customer_id:1,
        dog_name:"ไอโบ้",
    }
}
const fakeProgress = {
    1:{
    host_id:3,
    customer_id:1,
    dog_id:1,
    service_create_time:"",
    service_reply_time:"",
    service_reg_time:"2021-04-25 08:00:00",
    service_end_time:"2021-04-27 16:00:00",
    
    
}
}
export default class ProgressAPI {



    static fakeServiceProgress(id) {
        return new Promise((resolve, reject) => {
            if(fakeProgress[id]){
                resolve(fakeProgress[id])
            }else{
                reject("Not Found")
            }
            

        })
    }

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

    static fakeDog(userid) {
        return new Promise((resolve, reject) => {
            if(testDog[userid]){
                resolve(testDog[userid])
            }else{
                reject("404: Host not Found")
            }
            
        })
    }

}
