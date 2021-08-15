import Logo from '../../assets/logo.svg'
import { NavLink as Link } from 'react-router-dom'
import AuthContext from '../../store/stakeholder/auth/authContext';
import { useContext } from 'react';
import { useHistory } from 'react-router';

const SidebarView = () => {

    const history = useHistory()
    const{logoutStakeholder,stakeholderUser} = useContext(AuthContext)


    const logout = () =>{
        logoutStakeholder()
        history.replace('/stakeholder')
    }
    return ( 
        <nav className="sidebarStakeholder">
            <img src={Logo} alt="logo" className="sidebar-logo" />
            <ul>
                <li className="sidebarStakeholder-link">
                    <Link activeStyle={{backgroundColor: `rgba(224,18,18,.1)`, color:'#E01212', borderRadius: '0.9rem'}} to='/stakeholder/dashboard'><p className='link'>Dashboard</p></Link>
                </li>
                <li className="sidebarStakeholder-link">
                    <Link activeStyle={{backgroundColor: `rgba(224,18,18,.1)`, color:'#E01212', borderRadius: '0.9rem'}} to='/stakeholder/distress_log'>History log</Link>
                </li>
                <li className="sidebarStakeholder-link">
                    <Link activeStyle={{backgroundColor: `rgba(224,18,18,.1)`, color:'#E01212', borderRadius: '0.9rem'}} to='/stakeholder/settings'>Settings</Link>
                </li>
                <li className="sidebarStakeholder-link">
                    <button className='logout' onClick={logout}>Logout</button>
                </li>
            </ul> 
            <div className="sidebarStakeholder-profile">
                <div className="sidebarStakeholder-profile__initials"></div>
                <div>
                    <p className="sidebarStakeholder-profile__fullname">{stakeholderUser && stakeholderUser.firstname + ' ' + stakeholderUser.lastname}</p>
                    <p className="sidebarStakeholder-profile__usertype">{stakeholderUser && '(' + stakeholderUser.user_type + ')'}</p>
                </div>
            </div>
        </nav>
     );
}
 
export default SidebarView;