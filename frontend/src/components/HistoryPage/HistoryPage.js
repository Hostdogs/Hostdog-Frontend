import React,{useState,useEffect} from 'react'
import HistoryList from './HistoryList'
import NavbarisAuth from '../Navbar/NavbarIsAuth'
import SideBar from '../sidebar/SideBar'
import { useCookies } from "react-cookie";
import ServiceAPI from "../API/ServiceAPI";
export default function HistoryPage() {

    const [cookies, setcookies] = useCookies(["mytoken", "user_id"]);
    const [isOpen, setIsOpen] = useState(false);
    const [customerService,setCustomerService]=useState([]);
    const [oneService,setOneService]=useState();
    const toggleSideBar = () => {
        console.log("hello")
        setIsOpen(!isOpen)
    }
    const getCustomerService=async()=>{
        const response =await ServiceAPI.listService(cookies.mytoken)
        setCustomerService((response.data).filter((history) => {
            if (history.customer.account===parseInt(cookies.user_id)){
              return history;
            } else {
              return null;
            }
            }
          ));
         
      
            

    }

    useEffect(() => {
        getCustomerService();
    }, [])
    return (
        <div>
 
            <NavbarisAuth toggleSideBar={toggleSideBar}/>
            <SideBar isOpen={isOpen}/>
            <HistoryList ServiceList={customerService}/>
        </div>
    )
}
