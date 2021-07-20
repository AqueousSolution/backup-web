import Logo from '../assets/logo.svg'
import { NavLink as Link } from 'react-router-dom'

const SidebarView = () => {
    return ( 
        <nav className="sidebar">
            <img src={Logo} alt="logo" className="sidebar-logo" />
            <ul>
                <li className="sidebar-link">
                    <Link activeStyle={{backgroundColor: '#E0E6F0', borderRadius: '0.9rem'}} to='/dashboard'>Dashboard</Link>
                </li>
                <li className="sidebar-link">
                    <Link activeStyle={{backgroundColor: '#E0E6F0', borderRadius: '0.9rem'}} to='/distress_log'>Distress log</Link>
                </li>
                <li className="sidebar-link">
                    <Link activeStyle={{backgroundColor: '#E0E6F0', borderRadius: '0.9rem'}} to='/stakeholders'>Stakeholder</Link>
                </li>
                <li className="sidebar-link">
                    <Link activeStyle={{backgroundColor: '#E0E6F0', borderRadius: '0.9rem'}} to='/settings'>Settings</Link>
                </li>
            </ul> 
        </nav>
     );
}
 
export default SidebarView;