import { useContext, useEffect, useState } from "react";
import { NavLink as Link } from "react-router-dom";
import AuthContext from "../../../store/stakeholder/auth/authContext";
import { useHistory } from 'react-router-dom'
import {CircularProgress} from '@material-ui/core'
import Logo from '../../../assets/backUp-logo.svg'
import AppStore from '../../../assets/app-store.svg'
import GooglePlay from '../../../assets/google-play.svg'

const Login = () => {

    const[alert,setAlert] = useState('')

    const[loading,setLoading] = useState(false)
    const{ loginStakeholder, error, clearError, stakeholderUser } = useContext(AuthContext)
    const history = useHistory()

    const token = localStorage.getItem('token')

    const [loginDetails, setLoginDetails] = useState({
        email:'',
        password:''
    })

    const{email, password} = loginDetails

    useEffect(()=>{
        if(stakeholderUser && token){
            setLoading(true)
            setTimeout(() => setLoading(false), 2000);
            history.replace('/stakeholder/distress_calls')
        }
    },[stakeholderUser,token,history]) 

    

    const handleChange = e => {
        setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
      };

    const onSubmit = (e) =>{
        e.preventDefault()
        setAlert('')
        clearError()
        if(email === '' || password===''){
            setAlert('Please fill in all fields')
        }else{
            setLoading(true)
            loginStakeholder(loginDetails)
            if(error){
                setTimeout(() => setLoading(false), 1000);
                console.log(error)
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
                        <p>Dont have an account? </p>
                        <button><Link to='/stakeholder/register'> Sign up </Link></button>
                    </div>
                
                    <div className='get-started'>
                        <h2>Sign in</h2>
                        <p className='subtitle'>Sign in as a stakeholder</p>
                        {error && <p className='error'>{error && error.data ? error.data.message : alert}</p> }
                    </div>

                    <form onSubmit={onSubmit}>

                        

                        <input 
                        type="email" 
                        placeholder='Enter your email' 
                        className="login-form__field"
                        name='email'
                        value={email}
                        onChange={handleChange}/>
                        <input 
                        type="text" 
                        placeholder='Enter your password' 
                        className="login-form__field"
                        name='password'
                        value={password}
                        onChange={handleChange}/>
                           <button variant="contained"
                            className='login-form__submit' 
                            onClick={onSubmit} 
                            disabled={loading}>
                            {loading && <CircularProgress style={{color:'white'}} size={14} />}
                            {!loading && 'Sign In'}
                          </button>
                          <div style={{textAlign:'center', marginTop:'1rem', fontSize: '.85rem'}}>
                                <Link to='/stakeholder/forgot_password'>Forgot Password?</Link>
                          </div>
                    </form>
                </div>
            </div>
            }
            
        </>
     );
}
 
export default Login;