import { useEffect, useContext, useState } from "react";
import AuthContext from "../../../store/admin/auth/authContext";

const Register = () => {

    const {getStates,getLgas,states, lgas, registerAdmin} = useContext(AuthContext)

    const [regDetails, setRegDetails] = useState({
        state: '',
        lga: '',
        first_name: '',
        last_name: '',
        email:'',
        phone: '0',
        password: '',      
      });

      const[localStates, setLocalStates] = useState([])
      const[localLGAs, setLocalLGAs] = useState([])

      const {
          state,
          lga,
          first_name,
          last_name,
          email,
          phone,
          password
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
        registerAdmin(regDetails)
    }

    return ( 
        <div className='register'>
            <div className='register-banner'>

            </div>
            <div className="register-form">

               

                <form onSubmit={onSubmit}>
                    <div className="form-row">
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
                    </div>

                    <div className="form-row">
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
                    </div>
                 

                    <input type="password" 
                    placeholder='Enter your password' 
                    className="register-form__field"
                    name='password'
                    value={password}
                    onChange={handleChange}/>

                    <div className="form-row">
                        <select name="state" id="states" className="login-form__field" value={state} onChange={handleChange}>
                            {
                            localStates && localStates.map((state)=>(
                                    <option value={state.id} key={state.id}>{state.name}</option>
                                ))
                            } 
                        </select>
                        <select name="lga" id="lga" className="login-form__field" value={lga} onChange={handleChange}>
                        {
                                localLGAs && localLGAs.map((lga)=>(
                                    <option value={lga.id} key={lga.id}>{lga.name}</option>
                                )) 
                            }
                        </select>
                    </div>

             
                    <input type='submit' className="login-form__submit"  value='Submit'/>
                </form>
            </div>
        </div>
     );
}
 
export default Register;