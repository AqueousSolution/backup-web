import { useContext, useState } from "react";
import { NavLink as Link } from "react-router-dom";
import { useHistory } from 'react-router';
import AuthContext from "../../../store/stakeholder/auth/authContext";
import {CircularProgress} from '@material-ui/core'
import Logo from '../../../assets/backUp-logo.svg'
import AppStore from '../../../assets/app-store.svg'
import GooglePlay from '../../../assets/google-play.svg'

const ForgotPassword = () => {

    const[alert,setAlert] = useState('')

    const[loading,setLoading] = useState(false)
    const{ forgotPasswordError, clearError, forgotPassword, successfulReg } = useContext(AuthContext)

    const history = useHistory()

    const [passwordDetails, setPasswordDetails] = useState({
        email:'',
    })

    const{email} = passwordDetails


    const handleChange = e => {
        setPasswordDetails({ ...passwordDetails, [e.target.name]: e.target.value });
      };

    const onSubmit = (e) =>{
        e.preventDefault()
        setAlert('')
        clearError()
        if(email === '' ){
            setAlert('Please fill in your email')
        }else{
            setLoading(true)
            forgotPassword(passwordDetails)
            history.push('/stakeholder/reset_password')
            if(forgotPasswordError){
                setTimeout(() => setLoading(false), 1000);
                console.log(forgotPasswordError.data.message)
            }
        }
        setTimeout(() => setLoading(false), 1000);
    }

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
                        <h2>Forgot Password</h2>
                        <p className='subtitle'>Enter your registered email address</p>
                        {forgotPasswordError && <p className='forgotPasswordError'>{forgotPasswordError && forgotPasswordError.data ? forgotPasswordError.data.message : alert}</p> }
                        {
                            successfulReg && successfulReg.message==='Password reset link was sent to your email' 
                            ?
                            <p style={{color:'green',fontSize:'.85rem'}}>{successfulReg.message + ' !'}</p>
                            :
                            ''
                        }
                    </div>

                    <form onSubmit={onSubmit}>

                        

                        <input 
                        type="email" 
                        placeholder='Enter your email' 
                        className="login-form__field"
                        name='email'
                        value={email}
                        onChange={handleChange}/>
                    
                           <button variant="contained"
                            className='login-form__submit' 
                            onClick={onSubmit} 
                            disabled={loading}>
                            {loading && <CircularProgress style={{color:'white'}} size={14} />}
                            {!loading && 'Reset Password'}
                          </button>
                    </form>
                </div>
            </div>
            }
            
        </>
     );
}
 
export default ForgotPassword;