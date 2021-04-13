import React,{useState} from 'react'
import HistoryList from './HistoryList'
import NavbarisAuth from '../Navbar/NavbarIsAuth'
import SideBar from '../sidebar/SideBar'
export default function HistoryPage() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSideBar = () => {
        console.log("hello")
        setIsOpen(!isOpen)
    }
    
    return (
        <div>
            
            <NavbarisAuth toggleSideBar={toggleSideBar}/>
            <SideBar isOpen={isOpen} />
            <HistoryList/>
        </div>
    )
}
