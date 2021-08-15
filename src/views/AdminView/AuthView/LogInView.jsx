import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../store/admin/auth/authContext";
import { useHistory } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { NavLink as Link } from "react-router-dom";
import Logo from '../../../assets/backUp-logo.svg'
import AppStore from '../../../assets/app-store.svg'
import GooglePlay from '../../../assets/google-play.svg'


const Login = () => {

    const[alert,setAlert] = useState('')
    const[loading,setLoading] = useState(false)
    const{ loginAdmin, error, adminUser,clearError } = useContext(AuthContext)
    const history = useHistory()
    const token = localStorage.getItem('token')

    const [loginDetails, setLoginDetails] = useState({
        email:'',
        password:''
    })

    const{email, password} = loginDetails

    useEffect(()=>{
        if(adminUser && token){
            setLoading(true)
            setTimeout(() => setLoading(false), 2000);
            history.replace('/admin/dashboard')
            //setRedirect(true) 
        }
    },[adminUser,token, history])


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
            loginAdmin(loginDetails)
            if(error){
                setTimeout(() => setLoading(false), 1000);
                console.log(error.data.message)
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

                <div className='sign-in hidden'>
                        <p>Dont have an account? </p>
                        <button><Link to='/register'> Sign up </Link></button>
                    </div>
                
                    <div className='get-started'>
                        <h2>Sign in</h2>
                        <p className='subtitle'>Sign in as an admin</p>
                    </div>

                    <form onSubmit={onSubmit}>

                    { <p className='error'>{error ? error.data.message : alert}</p> }

                        <input 
                        type="email" 
                        placeholder='Enter your email' 
                        className="login-form__field"
                        name='email'
                        value={email}
                        onChange={handleChange}/>
                        <input 
                        type="password" 
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
                            {!loading && 'Click Me'}
                          </button>
                    </form>
                </div>
            </div>
            }
            
        </>
     );
}
 
export default Login;