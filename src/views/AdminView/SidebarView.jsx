import Logo from '../../assets/logo.svg'
import { NavLink as Link } from 'react-router-dom'
import AuthContext from '../../store/admin/auth/authContext';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { useEffect } from 'react';

const SidebarView = () => {

    const history = useHistory()
    const{logoutAdmin,adminUser,loadAdminUser} = useContext(AuthContext)

    const logout = () =>{
        logoutAdmin()
        history.replace('/admin')
    }

    useEffect(()=>{
        loadAdminUser()
        //eslint-disable-next-line
    },[])
    return ( 
        <nav className="sidebar">
            <img src={Logo} alt="logo" className="sidebar-logo" />
            <ul>
                <li className="sidebar-link">
                    <Link activeStyle={{backgroundColor: '#E0E6F0', borderRadius: '0.9rem'}} to='/admin/dashboard'>Dashboard</Link>
                </li>
                <li className="sidebar-link">
                    <Link activeStyle={{backgroundColor: '#E0E6F0', borderRadius: '0.9rem'}} to='/admin/distress_log'>Distress log</Link>
                </li>
                <li className="sidebar-link">
                    <Link activeStyle={{backgroundColor: '#E0E6F0', borderRadius: '0.9rem'}} to='/admin/stakeholders'>Stakeholder</Link>
                </li>
                <li className="sidebar-link">
                    <Link activeStyle={{backgroundColor: '#E0E6F0', borderRadius: '0.9rem'}} to='/admin/settings'>Settings</Link>
                </li>
                <li className="sidebar-link">
                    <button className='logout' onClick={logout}>Logout</button>
                </li>
            </ul> 
            <div className="sidebar-profile">
                <div className="sidebar-profile__initials"></div>
                <div>
                    <p className="sidebar-profile__fullname">{adminUser ? adminUser.firstname + ' ' + adminUser.lastname : '-'}</p>
                    <p className="sidebar-profile__usertype">{adminUser ? adminUser.user_type : '-'}</p>
                </div>
            </div>
        </nav>
     );
}
 
export default SidebarView;