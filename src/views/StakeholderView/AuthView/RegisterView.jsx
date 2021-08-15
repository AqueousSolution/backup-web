import { useEffect, useContext, useState } from "react";
import AuthContext from "../../../store/stakeholder/auth/authContext";
import { NavLink as Link } from "react-router-dom";
import Logo from '../../../assets/backUp-logo.svg'
import AppStore from '../../../assets/app-store.svg'
import GooglePlay from '../../../assets/google-play.svg'

const Register = () => {


    const {getStates,getLgas,states, lgas, registerStakeholder} = useContext(AuthContext)

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

      console.log(localStates)

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
        console.log(regDetails)
        registerStakeholder(regDetails)
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
                     type="text"
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
                    {
                            localLGAs && localLGAs.map((lga)=>(
                                <option value={lga.id} key={lga.id}>{lga.name}</option>
                            )) 
                        }
                    </select>
                    <input type='submit' className="register-form__submit"  value='Submit'/>
                </form>
            </div>
        </div>
     );
}
 
export default Register;