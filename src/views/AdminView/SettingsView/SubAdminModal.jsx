import { useEffect, useContext, useState } from "react";
import AuthContext from "../../../store/admin/auth/authContext";
import {CircularProgress} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const SubAdminModal = ({closeSubadminModal}) => {

    const {getStates,getLgas,states, lgas,error, clearError, registerAdmin, successfulReg } = useContext(AuthContext)
    const[loading,setLoading] = useState(false)

    const[adminError,setAdminError] = useState({
        status: false,
        description:''
    })

    const[successAlert, setOpenAlert] = useState(false)

    const [regDetails, setRegDetails] = useState({
        state: '',
        lga: '',
        first_name: '',
        last_name: '',
        email:'',
        phone: '',
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


    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
    };


    const onSubmit = (e) =>{
        e.preventDefault()
        setAdminError({status: false, description: ''})
        setLoading(true)
        clearError()

        if(state && lga && first_name && last_name && email && phone && password ){
            if(password.length<7){
                
                setTimeout(() => setLoading(false), 1000);
                setAdminError({status: true, description: 'password must contain at least eight characters'})
            }else if(phone.length!==11){
                setTimeout(() => setLoading(false), 1000);
                setAdminError({status: true, description: 'phone number must be 11 digits'})
            }else{
                setTimeout(() => setLoading(false), 2000);
                registerAdmin(regDetails)
            }
        }else{
            setTimeout(() => setLoading(false), 1000);
            setAdminError({status: true, description: 'Please fill in all fields'})
        }
        
    }

     useEffect(()=>{

        if(error && error.response){
            if(error.response.data.errors.email){
                setAdminError({status: true, description: error.response.data.errors.email})
            }else if(error.response.data.errors.phone){
                setAdminError({status: true, description: error.response.data.errors.phone})
            }
        }else if(successfulReg){
            setOpenAlert(true)
            setRegDetails({
                state: '',
                lga: '',
                first_name: '',
                last_name: '',
                email:'',
                phone: '',
                password: '', 
            })
        }
        
    },[error,successfulReg]) 

    return ( 
        <div className="stakeholder-modal">

             <Snackbar open={successAlert}  onClose={handleCloseAlert} >
                    <Alert onClose={handleCloseAlert} severity="success">
                        Admin Created Successfully
                    </Alert>
             </Snackbar>

            <h2>Add new admin</h2>
            
            <form onSubmit={onSubmit}>
            {adminError.status ? <p className='error'>{adminError.description}</p> : ''}
                    <div className="form-row">
                        <input 
                        type="text" 
                        name='first_name'
                        value={first_name}
                        onChange={handleChange}
                        placeholder="Enter admin's first name" 
                        className="stakeholder-modal__field"/>  

                        <input 
                        type="text" 
                        placeholder="Enter admin's last name"
                        className="stakeholder-modal__field"
                        name='last_name'
                        value={last_name}
                        onChange={handleChange}/>
                    </div>

                    <div className="form-row">
                        <input 
                        type="text"
                        placeholder="Enter admin's email" 
                        className="stakeholder-modal__field"
                        name='email'
                        value={email}
                        onChange={handleChange}/>

                        <input type="text"
                        placeholder="Enter admin's phone" 
                        className="stakeholder-modal__field"
                        name='phone'
                        value={phone}
                        onChange={handleChange}/>
                    </div>
                 

                    <div className="form-row">
                        <select name="state" id="states" className="stakeholder-modal__field" value={state} onChange={handleChange}>
                            <option value="" key='0'>Select Admin's state of residence</option>
                            {
                            localStates && localStates.map((state)=>(
                                <>
                                    {/* <option value=''>Select your state</option> */}
                                    <option value={state.id} key={state.id}>{state.name}</option>
                                </>
                                ))
                            } 
                        </select>
                        <select name="lga" id="lga" className="stakeholder-modal__field" value={lga} onChange={handleChange}>
                            <option value="" key='0'>Select Admin's LGA</option>
                        {
                                localLGAs && localLGAs.map((lga)=>(
                                    <>
                                        {/* <option value=''>Select your LGA</option> */}
                                        <option value={lga.id} key={lga.id}>{lga.name}</option>
                                    </>
                                )) 
                            }
                        </select>
                    </div>

                    <div className="form-row">

                        <input type="password" 
                        placeholder="Enter admin's password" 
                        className="stakeholder-modal__field"
                        name='password'
                        value={password}
                        onChange={handleChange}/>
                    </div>
                    
                    <div className="actions">
                        <button className='stakeholder-modal__cancel' onClick={closeSubadminModal}>Cancel</button>
                        <button variant="contained"
                            className='stakeholder-modal__submit' 
                            onClick={onSubmit} 
                            disabled={loading}>
                            {loading && <CircularProgress style={{color:'white'}} size={14} />}
                            {!loading && ' + New admin'}
                        </button>
                    </div>

                </form>
        </div>
     );
}
 
export default SubAdminModal;