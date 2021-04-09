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

    const [isOpenSideBar, setSideBar] = useState(false);
    const toggleSideBar = () => {
        
        setSideBar(!isOpenSideBar);
        console.log(isOpenSideBar);
    }

    return (
        <div>
            {token['mytoken'] ? (<NavbarIsAuth toggleSideBar={toggleSideBar}/>):(<NavbarNoAuth/>)}
            {token['mytoken'] ? (
            <div>
                <ContentIsAuth/><SideBar isOpenSideBar={isOpenSideBar}/>
            </div>
            ):(<ContentNoAuth/>)}
            <Footer/>
        </div>
    )
}
