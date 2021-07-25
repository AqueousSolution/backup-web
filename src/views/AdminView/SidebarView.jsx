import Logo from '../../assets/logo.svg'
import { NavLink as Link } from 'react-router-dom'
import AuthContext from '../../store/auth/authContext';
import { useContext } from 'react';
import { useHistory } from 'react-router';

const SidebarView = () => {

    const history = useHistory()
    const{logoutAdmin} = useContext(AuthContext)

    const logout = () =>{
        logoutAdmin()
        history.replace('/login')
    }
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
                <li className="sidebar-link">
                    <button className='logout' onClick={logout}>Logout</button>
                </li>
            </ul> 
            <div className="sidebar-profile">
                <div className="sidebar-profile__initials"></div>
                <div>
                    <p className="sidebar-profile__fullname">Joe Badru</p>
                    <p className="sidebar-profile__usertype">(Super admin)</p>
                </div>
            </div>
        </nav>
     );
}
 
export default SidebarView;