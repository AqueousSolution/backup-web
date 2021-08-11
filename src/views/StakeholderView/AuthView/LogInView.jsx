import { useContext, useEffect, useState } from "react";
import banner from '../../../assets/banner.png'
import AuthContext from "../../../store/stakeholder/auth/authContext";
import { useHistory } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

const Login = () => {

    const[loading,setLoading] = useState(false)
    const{ loginStakeholder, error, stakeholderUser } = useContext(AuthContext)
    const history = useHistory()

    const token = localStorage.getItem('token')

    const [loginDetails, setLoginDetails] = useState({
        email:'',
        password:''
    })

    const{email, password} = loginDetails

    useEffect(()=>{
        if(error === 'Invalid email or password' || error === 'The given data was invalid.'){
            console.log('e no dey')
        }
    },[error])

    useEffect(()=>{
        if(stakeholderUser && token){
            setLoading(false)
            history.replace('/stakeholder-dashboard')
        }
    },[stakeholderUser,token,history])

    

    const handleChange = e => {
        setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
      };

    const onSubmit = (e) =>{
        e.preventDefault()
        loginStakeholder(loginDetails)
        setLoading(true)
    }

    return ( 
        <>
            {
                loading?
                <CircularProgress style={{position:"absolute",top:'50%', left:'50%'}}/>
                :
                <div className='login'>
                <div className='login-banner'>
                    <img src={banner} alt="banner" className="login-banner__image" />
                </div>
                <div className="login-form">
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
                        <button className="login-form__submit">Login</button>
                    </form>
                </div>
            </div>
            }
            
        </>
     );
}
 
export default Login;