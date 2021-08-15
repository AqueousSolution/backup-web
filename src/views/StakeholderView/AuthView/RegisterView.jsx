import { useEffect, useContext, useState } from "react";
import AuthContext from "../../../store/stakeholder/auth/authContext";
import { NavLink as Link } from "react-router-dom";
import Logo from '../../../assets/backUp-logo.svg'
import AppStore from '../../../assets/app-store.svg'
import GooglePlay from '../../../assets/google-play.svg'
import {CircularProgress} from '@material-ui/core'

const Register = () => {


    const {getStates,getLgas,states, lgas, registerStakeholder,successfulReg, error} = useContext(AuthContext)

    const[loading,setLoading] = useState(false)

    const [regDetails, setRegDetails] = useState({
        state: '',
        lga: '',
        first_name: '',
        last_name: '',
        email:'',
        phone: '',
        password: '',
        profession:''      
      });

      const[localStates, setLocalStates] = useState([])
      const[localLGAs, setLocalLGAs] = useState([])

      const[regError, setRegError]= useState({
          status: false,
          description:''
      })

      const {
          state,
          lga,
          first_name,
          last_name,
          email,
          phone,
          password,
          profession
      } = regDetails

    useEffect(()=>{

        if(error && error.response){
            if(error.response.data.errors.email){
                setRegError({status: true, description: error.response.data.errors.email})
            }else if(error.response.data.errors.phone){
                setRegError({status: true, description: error.response.data.errors.phone})
            }
        }else if(successfulReg){
            console.log(successfulReg)
        }
        
    },[error,successfulReg])

    useEffect(()=>{
        getStates()
        /*eslint-disable*/
    },[])

    useEffect(()=>{
        setLocalStates(states)
    },[states])

    useEffect(()=>{
        setLocalLGAs(lgas)
    },[lgas])

    useEffect(()=>{
        if(state !== ''){
            getLgas(state)
        }
    },[state])

    const handleChange = e => {
        setRegDetails({ ...regDetails, [e.target.name]: e.target.value });
      };

    const onSubmit = (e) =>{
        e.preventDefault()
        setRegError({status: false, description: ''})
        setLoading(true)

        if(state && lga && first_name && last_name && email && phone && password && profession){
            if(password.length<7){
                
                setTimeout(() => setLoading(false), 1000);
                setRegError({status: true, description: 'password must contain at least eight characters'})
            }else if(phone.length!==11){
                setTimeout(() => setLoading(false), 1000);
                setRegError({status: true, description: 'phone number must be 11 digits'})
            }else{
                setTimeout(() => setLoading(false), 2000);
                registerStakeholder(regDetails)
            }
        }else{
            setTimeout(() => setLoading(false), 1000);
            setRegError({status: true, description: 'Please fill in all fields'})
        }
       
    }


    return ( 
        <div className='register'>
            <div className='register-banner'>
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
            <div className="register-form">

                <div className='sign-in'>
                    <p>Already have an account?</p>
                    <button><Link to='/stakeholder'> Sign in </Link></button>
                </div>
              
                <div className='get-started'>
                    <h2>Get started</h2>
                    <p className='subtitle'>Sign up as a stakeholder</p>
                    {regError.status ? <p className='error'>{regError.description}</p> : ''}
                </div>

               

                <form onSubmit={onSubmit}>
                    <input 
                    type="text" 
                    name='first_name'
                    value={first_name}
                    onChange={handleChange}
                    placeholder='Enter your first name' 
                    className="register-form__field"/>  

                    <input 
                    type="text" 
                    placeholder='Enter your last name'
                    className="register-form__field"
                    name='last_name'
                    value={last_name}
                    onChange={handleChange}/>

                    <input 
                     type='email'
                     placeholder='Enter your email' 
                     className="register-form__field"
                     name='email'
                     value={email}
                     onChange={handleChange}/>

                    <input type="text"
                     placeholder='Enter your phone' 
                     className="register-form__field"
                     name='phone'
                     value={phone}
                     onChange={handleChange}/>

                    <input type="text"
                     placeholder='Enter your profession' 
                     className="register-form__field"
                     name='profession'
                     value={profession}
                     onChange={handleChange}/>

                    <input type="password" 
                    placeholder='Enter your password' 
                    className="register-form__field"
                    name='password'
                    value={password}
                    onChange={handleChange}/>

                    <select name="state" id="states" className="register-form__field" value={state} onChange={handleChange}>
                        <option value=''>Select your state</option>
                        {
                           localStates && localStates.map((state)=>(
                                <option value={state.id} key={state.id}>{state.name}</option>
                            ))
                        } 
                    </select>
                    <select name="lga" id="lga" className="register-form__field" value={lga} onChange={handleChange}>
                        <option value=''>Select your LGA</option>
                    {
                            localLGAs && localLGAs.map((lga)=>(
                                <option value={lga.id} key={lga.id}>{lga.name}</option>
                            )) 
                        }
                    </select>
                    <button variant="contained"
                        className='register-form__submit' 
                        onClick={onSubmit} 
                        disabled={loading}>
                        {loading && <CircularProgress style={{color:'white'}} size={14} />}
                        {!loading && 'Click Me'}
                    </button>
                </form>
            </div>
        </div>
     );
}
 
export default Register;