import React from 'react'
import ContentIsAuth from './Content/ContentIsAuth'
import ContentNoAuth from './Content/ContentNoAuth'
import {useCookies} from 'react-cookie'
import NavbarIsAuth from '../Navbar/NavbarIsAuth'
import NavbarNoAuth from '../Navbar/NavbarNoAuth'
export default function HomePage() {
    const[token,setToken,removeToken] = useCookies(['mytoken'])
    
    return (
        <div>
            {token['mytoken'] ? (<NavbarIsAuth/>):(<NavbarNoAuth/>)}
            {token['mytoken'] ? (<ContentIsAuth/>):(<ContentNoAuth/>)}
        </div>
    )
}
