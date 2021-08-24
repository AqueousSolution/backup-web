import SidebarView from "../SidebarView";
import AuthContext from "../../../store/admin/auth/authContext";
import { useState,useContext } from "react";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useEffect } from "react";
import { Modal } from '@material-ui/core';
import SubAdminModal from "./SubAdminModal";


const SettingsView = () => {

    const{ changePassword,alert, adminUser,error, clearError, clearAlert } = useContext(AuthContext)

    const[passwordDetails,setPasswordDetails] = useState({
        old_password:'',
        password:'',
        password_confirmation:''
    })

    const [passwordError, setPasswordError] = useState('')

    const{old_password,password, password_confirmation} = passwordDetails

    const[openAlert, setOpenAlert] = useState(false)

    const[subadminModal,setSubadminModal] = useState(false)

    const openSubadminModal =() =>{
        setSubadminModal(true)
    }

    const closeSubadminModal =() =>{
        setSubadminModal(false)
    }

    const handleChange = (e) =>{
        setPasswordDetails({...passwordDetails,[e.target.name]:e.target.value})
    }

    const onSubmit = (e) =>{
        e.preventDefault()
        clearError()
        setPasswordError('')
        if(password.length<=6 && password_confirmation.length<=6){
            setPasswordError('Password must be at least 7 characters')
        }else if(password!==password_confirmation){
            setPasswordError('New password confirmation is wrong')
        }else{
            changePassword(passwordDetails)
            setPasswordDetails({
                old_password:'',
                password:'',
                password_confirmation:''
            })
        }
  
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
      };

    useEffect(()=>{
      clearError()
      //eslint-disable-next-line
    },[])

    useEffect(()=>{
        if(alert===true){
            setOpenAlert(true)
            setTimeout(()=>clearAlert(),3000)
        }else{
            setOpenAlert(false)
        }
    },[alert,clearAlert])

    useEffect(()=>{
        if(error){
            setPasswordError(error.data.message)
        }
    },[error])

    return ( 
    <>
        <Modal 
            open={subadminModal}
            onClose={closeSubadminModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <div>
            <SubAdminModal closeSubadminModal={closeSubadminModal}/>
            </div>
                
        </Modal>
        <div className="main">
            <SidebarView />
            <section className="settings">
                <Snackbar open={openAlert}  onClose={handleCloseAlert} style={{position:"absolute"}}>
                    <Alert onClose={handleCloseAlert} severity="success">
                        Password Updated Successfully!
                    </Alert>
                </Snackbar>
                <header className="settings-header">
                        <div className='flex-b'>
                            <div>
                                <h1>Settings</h1>
                                <p>Change Password</p>
                            </div>
                           {
                            adminUser && adminUser.user_type==='super-admin'?
                            <button className='btn-two' onClick={openSubadminModal}>Create subadmin</button>
                            :''
                            }
                        </div>
                </header>
                <form className="settings-form" onSubmit={onSubmit}>
                   {passwordError && <p className='error'>{passwordError}</p>}
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
        </div> 
    </>);
}
 
export default SettingsView;