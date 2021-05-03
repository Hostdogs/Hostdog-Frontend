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
        host_bio: "สวัสดีครับ",
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
    }, 5:{
        userid: 5,
        first_name: "พลธพัท",
        last_name: "ชูจันทร์",
        host_bio: "เห้ย",
        date_joined: "2021-04-28",
        last_login: "2021-04-29 11:35:20",
        dob: "1997-02-29",
        gender: "male",
        picture: "https://randomuser.me/api/portraits/men/8.jpg"
    }
}
const testDog = {
    1:{
        customer_id:1,
        dog_name:"ไอโบ้",
    },
    2:{
        customer_id:1,
        dog_name:"สุนัข1"
    }
}
const fakeService = [
 {
    service_id:1,
    host_id:3,
    customer_id:1,
    dog_id:1,
    service_create_time:"",
    service_reply_time:"",
    service_reg_time:"2021-04-25 08:00:00",
    service_end_time:"2021-04-27 16:00:00",
    service_status:"pending", 
},{
    service_id:2,
    host_id:4,
    customer_id:1,
    dog_id:2,
    service_create_time:"",
    service_reply_time:"",
    service_reg_time:"2021-04-25 08:00:00",
    service_end_time:"2021-04-27 16:00:00",
    service_status:"payment", 
},{
    service_id:3,
    host_id:4,
    customer_id:1,
    dog_id:1,
    service_create_time:"",
    service_reply_time:"",
    service_reg_time:"2021-04-25 08:00:00",
    service_end_time:"2021-04-27 16:00:00",
    service_status:"end", 
},{
    service_id:4,
    host_id:3,
    customer_id:1,
    dog_id:2,
    service_create_time:"",
    service_reply_time:"",
    service_reg_time:"2021-04-25 08:00:00",
    service_end_time:"2021-04-27 16:00:00",
    service_status:"wait for progress", 
},{
    service_id:5,
    host_id:4,
    customer_id:1,
    dog_id:1,
    service_create_time:"",
    service_reply_time:"",
    service_reg_time:"2021-04-25 08:00:00",
    service_end_time:"2021-04-27 16:00:00",
    service_status:"in progress", 
},{
    service_id:6,
    host_id:5,
    customer_id:1,
    dog_id:2,
    service_create_time:"",
    service_reply_time:"",
    service_reg_time:"2021-04-25 08:00:00",
    service_end_time:"2021-04-27 16:00:00",
    service_status:"late", 
},{
    service_id:7,
    host_id:4,
    customer_id:1,
    dog_id:2,
    service_create_time:"",
    service_reply_time:"",
    service_reg_time:"2021-04-25 08:00:00",
    service_end_time:"2021-04-27 16:00:00",
    service_status:"cancelled", 
},{
    service_id:8,
    host_id:5,
    customer_id:1,
    dog_id:1,
    service_create_time:"",
    service_reply_time:"",
    service_reg_time:"2021-04-25 08:00:00",
    service_end_time:"2021-04-27 16:00:00",
    service_status:"wait for progress", 
}

]
export default class HistoryAPI {


    static fakeAllService() {
        return new Promise((resolve, reject) => {
            
            resolve(fakeService)
            
            

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
