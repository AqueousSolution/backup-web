import { useEffect, useContext, useState } from "react";
import AuthContext from "../../../store/stakeholder/auth/authContext";
import { NavLink as Link } from "react-router-dom";
import Logo from '../../../assets/backUp-logo.svg'
import AppStore from '../../../assets/app-store.svg'
import GooglePlay from '../../../assets/google-play.svg'
import {CircularProgress} from '@material-ui/core'
import { Modal } from '@material-ui/core';
import SuccessRegModal from "./SuccessRegModal";

const Register = () => {


    const {getStates,getLgas,states, lgas, registerStakeholder,successfulReg, error, clearError} = useContext(AuthContext)

    const[loading,setLoading] = useState(false)

    const[agreeToTerms, setAgreeToTerms] = useState(false)

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

      const[address, setAddress] = useState([])

      const[regError, setRegError]= useState({
          status: false,
          description:'',
          field: false
      })

    const[successModal,setSuccessModal] = useState(false)

    const openSuccessModal =() =>{
        setSuccessModal(true)
    }

    const closeSuccessModal =() =>{
        setSuccessModal(false)
        clearError()
    }

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
                setRegError({status: true, description: error.response.data.errors.email, field:'email'})
            }else if(error.response.data.errors.phone){
                setRegError({status: true, description: error.response.data.errors.phone, field:'phone'})
            }
        }else if(successfulReg){
            openSuccessModal()
            setRegDetails({
                state: '',
                lga: '',
                first_name: '',
                last_name: '',
                email:'',
                phone: '',
                password: '',
                profession:''      
            })
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

      const handleChangeAddress = e => {
        setAddress(e.target.value);
      };


      const handleTerms = (e) =>{
          setAgreeToTerms(e.target.checked)
      }

      console.log(agreeToTerms)

    const onSubmit = (e) =>{
        e.preventDefault()
        setRegError({status: false, description: '', field:false})
        clearError()
        setLoading(true)

        if(state && lga && first_name && last_name && email && phone && password && profession && agreeToTerms){
            if(password.length<7){
                
                setTimeout(() => setLoading(false), 1000);
                setRegError({status: true, description: 'password must contain at least eight characters', field: 'password'})
            }else if(phone.length!==11){
                setTimeout(() => setLoading(false), 1000);
                setRegError({status: true, description: 'phone number must be 11 digits', field: 'phone'})
            }else{
                setTimeout(() => setLoading(false), 2000);
                registerStakeholder(regDetails).then(res=> console.log(res))
            }
        }else if(!first_name){
            setTimeout(() => setLoading(false), 1000);
            setRegError({status: true, description: 'Please fill in a valid first name', field: 'first_name'})
        }else if(!last_name){
            setTimeout(() => setLoading(false), 1000);
            setRegError({status: true, description: 'Please fill in a valid last name', field: 'last_name'})
        }else if(!email){
            setTimeout(() => setLoading(false), 1000);
            setRegError({status: true, description: 'Please fill in a valid email', field: 'email'})
        }else if(!phone){
            setTimeout(() => setLoading(false), 1000);
            setRegError({status: true, description: 'Please fill in a valid phone number', field: 'phone'})
        }else if(!profession){
            setTimeout(() => setLoading(false), 1000);
            setRegError({status: true, description: 'Please fill in a valid profession', field: 'profession'})
        }else if(!password){
            setTimeout(() => setLoading(false), 1000);
            setRegError({status: true, description: 'Please fill in a valid password', field: 'password'})
        }else if(!lga){
            setTimeout(() => setLoading(false), 1000);
            setRegError({status: true, description: 'Please fill in a valid lga', field: 'lga'})
        }else if(!state){
            setTimeout(() => setLoading(false), 1000);
            setRegError({status: true, description: 'Please fill in a valid state', field: 'state'})
        }else if(!agreeToTerms){
            setTimeout(() => setLoading(false), 1000);
            setRegError({status: true, description: 'Tick the checkbox and agree with our terms to proceed', field: 'terms'})
        }else{
            setTimeout(() => setLoading(false), 1000);
        }
       
    }

    console.log(successfulReg)


    return ( 
        <>
        <Modal 
            open={successModal}
            onClose={closeSuccessModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <div>
            <SuccessRegModal />
            </div>
                
        </Modal>
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
                        <p onClick={openSuccessModal}>Already have an account?</p>
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
                        className={regError.field === 'first_name' ? "error-field register-form__field" : 'register-form__field'}/>  

                        <input 
                        type="text" 
                        placeholder='Enter your last name'
                        className={regError.field === 'last_name' ? "error-field register-form__field" : 'register-form__field'}
                        name='last_name'
                        value={last_name}
                        onChange={handleChange}/>

                        <input 
                        type='email'
                        placeholder='Enter your email' 
                        className={regError.field === 'email' ? "error-field register-form__field" : 'register-form__field'}
                        name='email'
                        value={email}
                        onChange={handleChange}/>

                        <input type="text"
                        placeholder='Enter your phone' 
                        className={regError.field === 'phone' ? "error-field register-form__field" : 'register-form__field'}
                        name='phone'
                        value={phone}
                        onChange={handleChange}/>

                        <input type="text"
                        placeholder='Enter your profession' 
                        className={regError.field === 'profession' ? "error-field register-form__field" : 'register-form__field'}
                        name='profession'
                        value={profession}
                        onChange={handleChange}/>

                        <input type="password" 
                        placeholder='Enter your password' 
                        className={regError.field === 'password' ? "error-field register-form__field" : 'register-form__field'}
                        name='password'
                        value={password}
                        onChange={handleChange}/>

                        
                        <input type="text"
                        placeholder='Enter your address' 
                        className={regError.field === 'address' ? "error-field register-form__field" : 'register-form__field'}
                        name='address'
                        value={address}
                        onChange={handleChangeAddress}/>

                        <select name="state" id="states" className={regError.field === 'state' ? "error-field register-form__field none" : 'register-form__field none'} value={state} onChange={handleChange}>
                            <option value=''>Select your state</option>
                            {
                            localStates && localStates.map((state)=>(
                                    <option value={state.id} key={state.id}>{state.name}</option>
                                ))
                            } 
                        </select>
                        <select name="lga" id="lga" className={regError.field === 'lga' ? "error-field register-form__field" : 'register-form__field'} value={lga} onChange={handleChange}>
                            <option value=''>Select your LGA</option>
                        {
                                localLGAs && localLGAs.map((lga)=>(
                                    <option value={lga.id} key={lga.id}>{lga.name}</option>
                                )) 
                            }
                        </select>
                        <br />
                        <label htmlFor="terms" className='TandC'>
                            <input type="checkbox" 
                            className={regError.field === 'state' ? "error-field" : 'termsss'}
                            checked={agreeToTerms}
                            value={agreeToTerms}
                            name='agreedToTerms'
                            onChange={handleTerms}/>
                            Tick if you agree with our <Link to='/policy'  target="_blank" rel="noopener noreferrer" > terms and conditions</Link>
                        </label>
                        <button variant="contained"
                            className='register-form__submit' 
                            onClick={onSubmit} 
                            disabled={loading}>
                            {loading && <CircularProgress style={{color:'white'}} size={14} />}
                            {!loading && 'Sign Up'}
                        </button>
                    </form>
                </div>
            </div>
        </>
     );
}
 
export default Register;