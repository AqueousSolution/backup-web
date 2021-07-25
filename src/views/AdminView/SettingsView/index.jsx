import SidebarView from "../SidebarView";
import AuthContext from "../../../store/auth/authContext";
import { useState,useContext } from "react";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useEffect } from "react";



const SettingsView = () => {

    const{ changePassword,alert } = useContext(AuthContext)

    const[passwordDetails,setPasswordDetails] = useState({
        old_password:'',
        password:'',
        password_confirmation:''
    })

    const{old_password,password, password_confirmation} = passwordDetails

    const[openAlert, setOpenAlert] = useState(false)

    const handleChange = (e) =>{
        setPasswordDetails({...passwordDetails,[e.target.name]:e.target.value})
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        changePassword(passwordDetails)
        setPasswordDetails({
            old_password:'',
            password:'',
            password_confirmation:''
        })
  
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
      };

    useEffect(()=>{
        if(alert===true){
            setOpenAlert(true)
        }
    },[alert])
    return ( 
    <div className="main">
        <SidebarView />
        <section className="settings">
            <Snackbar open={openAlert}  onClose={handleCloseAlert} style={{position:"absolute"}}>
                <Alert onClose={handleCloseAlert} severity="success">
                    Password Updated Successfully!
                </Alert>
            </Snackbar>
            <form className="settings-form" onSubmit={onSubmit}>
                <input 
                type="text" 
                className="settings-form__field" 
                placeholder='Previous password'
                name='old_password' 
                value={old_password}
                onChange={handleChange}/>

                <input 
                type="text" 
                className="settings-form__field"
                placeholder='New password'
                name='password' 
                value={password}
                onChange={handleChange}/>

                <input 
                type="text" 
                className="settings-form__field" 
                placeholder='Confirm new password'
                name='password_confirmation' 
                value={password_confirmation}
                onChange={handleChange}/>

                <button className="settings-form__button">Change password</button>
            </form>
        </section>
    </div> );
}
 
export default SettingsView;