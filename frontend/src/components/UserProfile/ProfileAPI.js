import axios from 'axios'
const API_URL = "https://jsonplaceholder.typicode.com/"

const testCustomer = {
    1: {
        userid: 1,
        name: "พลพัฒน์",
        surname: "สงวนสิริกุล",
    }, 2: {
        userid: 2,
        name: "พัทธพล",
        surname: "จันทร์ชู",
    }
}

const testHost = {
    3: {
        userid: 1,
        name: "พลแพท",
        surname: "จงวัฒนศิริ",
    }, 4: {
        userid: 2,
        name: "แพทย์ภูมิ",
        surname: "หาแก้ว",
    }
}
export default class ProfileAPI {

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