import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap';
import Footer from '../HomePage/Footer';
import NavbarIsAuth from '../Navbar/NavbarIsAuth';
import NavbarNoAuth from '../Navbar/NavbarNoAuth';
import SideBar from '../sidebar/SideBar';
import NotFound from './NotFound'
export default function NotFoundPage() {
    const [token, setToken, removeToken] = useCookies(['mytoken'])
    const [isOpen, setIsOpen] = useState(false);
    const toggleSideBar = () => {
        console.log("kb")
        setIsOpen(!isOpen)
    }

    return (
        <div>
            {token['mytoken'] ? (<NavbarIsAuth toggleSideBar={toggleSideBar} />) : (<NavbarNoAuth />)}

            {token['mytoken'] ? (
                <div>
                    <SideBar isOpen={isOpen} />
                </div>
            ) : (null)}
            <br /><br /><br /><br />
            <Container style={{ height: "75vh" }}>
                <NotFound/>
            </Container>

            <Footer />

        </div>
    )
}
