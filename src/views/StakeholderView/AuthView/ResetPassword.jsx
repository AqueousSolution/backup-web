import { useContext, useState } from "react";
import { NavLink as Link } from "react-router-dom";
import AuthContext from "../../../store/stakeholder/auth/authContext";
import {CircularProgress} from '@material-ui/core'
import Logo from '../../../assets/backUp-logo.svg'
import AppStore from '../../../assets/app-store.svg'
import GooglePlay from '../../../assets/google-play.svg'
import { useEffect } from "react";

const ResetPassword = () => {

    const[alert,setAlert] = useState('')

    const[loading,setLoading] = useState(false)
    const{ forgotPasswordError, clearError, resetPassword, successfulReg} = useContext(AuthContext)

    const [passwordDetails, setPasswordDetails] = useState({
        token:'',
        password: '',
        password_confirmation: ''
    })

    const{token, password, password_confirmation} = passwordDetails


    const handleChange = e => {
        setPasswordDetails({ ...passwordDetails, [e.target.name]: e.target.value });
      };

    const onSubmit = (e) =>{
        e.preventDefault()
        setAlert('')
        clearError()
        if(token === '' || password_confirmation === '' || password === ''){
            setAlert('Please fill in all fields')
        }else if(password.length < 7){
            setAlert('Password must contain at least 7 characters')
        }else if(password !== password_confirmation){
            setAlert('Password and confirmation does not match')
        }
        else{
            setLoading(true)
            resetPassword(passwordDetails)
            if(forgotPasswordError){
                setTimeout(() => setLoading(false), 1000);
                console.log(forgotPasswordError.data.message)
            }
        }
        setTimeout(() => setLoading(false), 1000);
    }

    useEffect(()=>{
        if(successfulReg){
            setAlert('Password Reset was successful')
        }
    },[successfulReg])

    return ( 
        <>
            {
                
                <div className='login'>
                <div className='login-banner'>
                    <img src={Logo} alt="logo" />
                    <h1>SAY NO TO </h1>
                    <h1>POLICE BRUTALITY</h1>
                    <h3>CALL FOR BACKUP</h3>
                    <div className='download'>
                        <h4>DOWNLOAD NOW</h4>
                        <img src={AppStore} alt="app-store" />
                        <img src={GooglePlay} alt="google-play" />
                     </div>
                </div>

                <div className="login-form">
                    <div className='sign-in'>
                        <p>Already have an account? </p>
                        <button><Link to='/stakeholder'> Sign in </Link></button>
                    </div>
                
                    <div className='get-started'>
                        <h2>Reset Password</h2>
                        <p className='subtitle'>Check for the token sent to your token</p>
                        {forgotPasswordError && <p className='error'>{forgotPasswordError && forgotPasswordError.data ? forgotPasswordError.data.message : alert}</p> }
                        {alert && <p className='error'>{alert}</p>}
                    </div>

                    <form onSubmit={onSubmit}>

                        

                        <input 
                        type="text" 
                        placeholder='Enter your token' 
                        className="login-form__field"
                        name='token'
                        value={token}
                        onChange={handleChange}/>

                        <input 
                        type="password" 
                        placeholder='Enter your new password' 
                        className="login-form__field"
                        name='password'
                        value={password}
                        onChange={handleChange}/>

                        <input 
                        type="password" 
                        placeholder='Confirm your new password' 
                        className="login-form__field"
                        name='password_confirmation'
                        value={password_confirmation}
                        onChange={handleChange}/>
                    
                           <button variant="contained"
                            className='login-form__submit' 
                            onClick={onSubmit} 
                            disabled={loading}>
                            {loading && <CircularProgress style={{color:'white'}} size={14} />}
                            {!loading && 'Change Password'}
                          </button>
                    </form>
                </div>
            </div>
            }
            
        </>
     );
}
 
export default ResetPassword;