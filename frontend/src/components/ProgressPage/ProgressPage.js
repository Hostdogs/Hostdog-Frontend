import NavbarIsAuth from '../Navbar/NavbarIsAuth';
import SideBar from '../sidebar/SideBar';
import ProgressBar from './ProgressBar';
import ServiceDetail from './ServiceDetail'
export default function ProgressPage() {
    return (
        <div>
            <NavbarIsAuth/>
            <ProgressBar/>
            <ServiceDetail/>
        </div>
    )
}
