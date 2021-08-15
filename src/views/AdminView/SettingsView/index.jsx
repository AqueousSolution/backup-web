import SidebarView from "../SidebarView";
import AuthContext from "../../../store/admin/auth/authContext";
import { useState,useContext } from "react";
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useEffect } from "react";
import { Modal } from '@material-ui/core';
import SubAdminModal from "./SubAdminModal";


const SettingsView = () => {

    const{ changePassword,alert, adminUser } = useContext(AuthContext)

    const[passwordDetails,setPasswordDetails] = useState({
        old_password:'',
        password:'',
        password_confirmation:''
    })

    console.log(adminUser)

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
    <>
        <Modal 
            open={subadminModal}
            onClose={closeSubadminModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <div>
            <SubAdminModal />
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
                            <h1>Settings</h1>
                           {
                            adminUser && adminUser.user_type==='super-admin'?
                            <button className='btn-two' onClick={openSubadminModal}>Create subadmin</button>
                            :''
                            }
                        </div>
                </header>
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
        </div> 
    </>);
}
 
export default SettingsView;