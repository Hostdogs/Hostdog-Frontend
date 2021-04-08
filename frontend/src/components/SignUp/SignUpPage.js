
import NavbarNoAuth from '../Navbar/NavbarNoAuth'
import SignUpForm from './SignUpForm'
import {useCookies} from 'react-cookie'

export default function SignUpPage() {
    
    return (
        <div>
            <NavbarNoAuth />
            <SignUpForm/>
        </div>
    )
}
