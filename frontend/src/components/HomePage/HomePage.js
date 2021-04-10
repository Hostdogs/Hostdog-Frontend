import React, {useState} from 'react'
import ContentIsAuth from './Content/ContentIsAuth'
import ContentNoAuth from './Content/ContentNoAuth'
import {useCookies} from 'react-cookie'
import NavbarIsAuth from '../Navbar/NavbarIsAuth'
import NavbarNoAuth from '../Navbar/NavbarNoAuth'
import Footer from './Footer'
import SideBar from '../sidebar/SideBar'

export default function HomePage() {
    const[token,setToken,removeToken] = useCookies(['mytoken'])
    const [isOpen, setIsOpen] = useState(false);
    const toggleSideBar = () => {
        console.log("kb")
        setIsOpen(!isOpen)
    }


    return (
        <div>
            {token['mytoken'] ? (<NavbarIsAuth toggleSideBar={toggleSideBar}/>):(<NavbarNoAuth/>)}
            {token['mytoken'] ? (
            <div>
                <ContentIsAuth/><SideBar IsOpen={isOpen}/>
            </div>
            ):(<ContentNoAuth/>)}
            <Footer/>
        </div>
    )
}
