import SidebarView from "../SidebarView";
import AuthContext from "../../../store/stakeholder/auth/authContext";
import { useState,useContext } from "react";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useEffect } from "react";
import { useHistory } from 'react-router';
import DisplayPic from '../../../assets/default-avatar.svg';
import Padlock from '../../../assets/padlock.svg';
import Alarm from '../../../assets/alarm.svg';
import CircularProgress from '@material-ui/core/CircularProgress'



const SettingsView = () => {

    const authToken = localStorage.getItem('token');

    const history = useHistory()

    const[loading,setLoading] = useState(false)

    const[profileError, setProfileError] = useState('')

    const[profileSuccess, setProfileSuccess] = useState(false)

    const [settingsTab, setSettingsTab] = useState('password')

    const{ changePassword,alert,error,clearError, stakeholderUser,loadStakeholderUser, editStakeholderProfile } = useContext(AuthContext)

    const[passwordDetails,setPasswordDetails] = useState({
        old_password:'',
        password:'',
        password_confirmation:''
    })

    const[profileDetails,setProfileDetails] = useState({
        first_name:'',
        last_name:'',
        phone:'',
        state:'',
        lga: ''
    })

    const{old_password,password, password_confirmation} = passwordDetails

    const{first_name,last_name, phone} = profileDetails

    console.log(stakeholderUser)

    const[openAlert, setOpenAlert] = useState(false)

    const handleChange = (e) =>{
        setPasswordDetails({...passwordDetails,[e.target.name]:e.target.value})
    }

    const handleProfileChange = (e) =>{
        setProfileDetails({...profileDetails,[e.target.name]:e.target.value})
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        console.log(alert)
        changePassword(passwordDetails)
        setPasswordDetails({
            old_password:'',
            password:'',
            password_confirmation:''
        })
        setTimeout(()=>clearError(),2000)
  
    }

    const edit = (e) =>{
        e.preventDefault()
        setProfileError('')
        setLoading(true)
        if(profileDetails.first_name === '' || profileDetails.last_name === '' || profileDetails.phone === ''){
            setProfileError('Please do not leave any field empty')
            setTimeout(() => setLoading(false), 1000);
        }else if ( phone.length > 14 || phone.length < 11){
            setProfileError('Phone number not correct')
            setTimeout(() => setLoading(false), 1000);
        }else{
            setTimeout(() => setLoading(false), 3000);
            editStakeholderProfile(profileDetails)
            setProfileSuccess(true)
            setTimeout(() => setProfileSuccess(false), 6000);
        }
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
        setProfileSuccess(false)
      };

    const handleTabChange = (e) =>{
        setSettingsTab(e.target.id)
        console.log(e)
    }

    useEffect(()=>{
        if(alert===true){
            setOpenAlert(true)
        }
        
    },[alert])

    useEffect(()=>{
        if(stakeholderUser){
            setProfileDetails({
                first_name: stakeholderUser.firstname,
                last_name: stakeholderUser.lastname,
                phone: stakeholderUser.phone,
                state: stakeholderUser.profile.state.id,
                lga: stakeholderUser.profile.lga.id
            })
        }
        
        //eslint-disable-next-line
    },[])

    useEffect(()=>{
        loadStakeholderUser()
        /*eslint-disable*/
    },[])

    useEffect(()=>{
        if(!authToken){
            history.replace('/stakeholder')
        }
    },[authToken])


    return ( 
    <div className="main">
        <SidebarView />

        <section className="stakeholdersettings">
            <div className="stakeholdersettings-menu">

                <img src={DisplayPic} alt="display-pic" className='stakeholdersettings-menu__dp' />
                <ul>
                    <li className={ settingsTab === 'profile' ? ' selectedItem stakeholdersettings-menu__item' : 'stakeholdersettings-menu__item'} id='profile' onClick={handleTabChange}>
                        <img src={Padlock} alt="edit" />
                        <div>
                            <p className='menu-name' id='profile' onClick={handleTabChange}>Edit Profile</p>
                            <p className='menu-info' id='profile' onClick={handleTabChange}>Update your profile details</p>
                        </div>
                    </li>

                    <li className={settingsTab === 'password' ? ' selectedItem stakeholdersettings-menu__item' : 'stakeholdersettings-menu__item'} id='password' onClick={handleTabChange}>
                        <img src={Alarm} alt="edit" />
                        <div>
                            <p className='menu-name' id='password' onClick={handleTabChange}>Reset Password</p>
                            <p className='menu-info' id='password' onClick={handleTabChange}>Change your password to a new one </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="stakeholdersettings-display">
               <Snackbar open={openAlert}  onClose={handleCloseAlert} style={{position:"absolute"}}>
                <Alert onClose={handleCloseAlert} severity="success">
                    Password Updated Successfully!
                </Alert>
              </Snackbar>   

              <Snackbar open={profileSuccess}  onClose={handleCloseAlert} style={{position:"absolute", bottom: 0}}>
                <Alert onClose={handleCloseAlert} severity="success">
                    Profile Updated Successfully!
                </Alert>
              </Snackbar>  
            {                
                
                settingsTab === 'password' ?
                <form className="stakeholdersettings-form" onSubmit={onSubmit}>

                 { <p className='error'>{error ? error.data.message : alert}</p> }

                    <input 
                    type="text" 
                    className="stakeholdersettings-form__field" 
                    placeholder='Previous password'
                    name='old_password' 
                    value={old_password}
                    onChange={handleChange}/>

                    <input 
                    type="text" 
                    className="stakeholdersettings-form__field"
                    placeholder='New password'
                    name='password' 
                    value={password}
                    onChange={handleChange}/>

                    <input 
                    type="text" 
                    className="stakeholdersettings-form__field" 
                    placeholder='Confirm new password'
                    name='password_confirmation' 
                    value={password_confirmation}
                    onChange={handleChange}/>

                    <button className="stakeholdersettings-form__button">Change password</button>
                </form> 
                :

                <form className="stakeholdersettings-form" onSubmit={onSubmit}>

                { <p className='error'>{profileError && profileError}</p> }

                    <label>
                        Firstname
                        <input 
                        type="text" 
                        className="stakeholdersettings-form__field" 
                        placeholder='First Name'
                        name='first_name' 
                        value={first_name}
                        onChange={handleProfileChange}/>
                    </label>
                   
                    <label>
                        Lastname
                        <input 
                        type="text" 
                        className="stakeholdersettings-form__field"
                        placeholder='Last name'
                        name='last_name' 
                        value={last_name}
                        onChange={handleProfileChange}/>
                    </label>
        
                    <label htmlFor="phone">
                        Phone
                        <input 
                        type="text" 
                        className="stakeholdersettings-form__field" 
                        placeholder='Phone Number'
                        name='phone' 
                        value={phone}
                        onChange={handleProfileChange}/>
                    </label>
    

                        <button variant="contained"
                            className="stakeholdersettings-form__button"
                            onClick={edit} 
                            disabled={loading}>
                            {loading && <CircularProgress style={{color:'white'}} size={14} />}
                            {!loading && 'Edit Profile'}
                        </button>
               </form> 
            }
            </div>
         
        </section>
    </div> );
}
 
export default SettingsView;