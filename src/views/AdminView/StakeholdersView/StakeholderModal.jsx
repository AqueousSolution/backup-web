import { useEffect, useContext, useState } from "react";
import AuthContext from "../../../store/admin/auth/authContext";
import StakeholdersContext from "../../../store/admin/stakeholders/stakeholdersContext";
import {CircularProgress} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const StakeholderModal = ({closeStakeholderModal}) => {

    const {getStates,getLgas,states, lgas } = useContext(AuthContext)
    const {createStakeholder, getStakeholders, error, clearError, successfulReg, clearSuccessReg} = useContext(StakeholdersContext)

    const[loading,setLoading] = useState(false)

    const[successAlert, setOpenAlert] = useState(false)



    const [stakeholderError, setStakeholderError] = useState({
        status: false,
        description:''
    })

    const [regDetails, setRegDetails] = useState({
        state: '',
        lga: '',
        first_name: '',
        last_name: '',
        email:'',
        phone: '',
        profession: '',
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
          profession,
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
        setStakeholderError({status: false, description: ''})
        setLoading(true)
        clearError()

        if(state && lga && first_name && last_name && email && phone && password ){
            if(password.length<7){
                
                setTimeout(() => setLoading(false), 1000);
                setStakeholderError({status: true, description: 'password must contain at least eight characters'})
            }else if(phone.length!==11){
                setTimeout(() => setLoading(false), 1000);
                setStakeholderError({status: true, description: 'phone number must be 11 digits'})
            }else{
                setTimeout(() => setLoading(false), 2000);
                createStakeholder(regDetails)
            }
        }else{
            setTimeout(() => setLoading(false), 1000);
            setStakeholderError({status: true, description: 'Please fill in all fields'})
        }
    }

    console.log(successfulReg)
    
    useEffect(()=>{

        if(error && error.response){
            if(error.response.data && error.response.data.errors.email){
                setStakeholderError({status: true, description: error.response.data.errors.email})
            }else if(error.response.data.errors.phone){
                setStakeholderError({status: true, description: error.response.data.errors.phone})
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
            setTimeout(()=>closeStakeholderModal(),3000)
            setTimeout(()=>clearSuccessReg(),3000)
            getStakeholders(1)
        }
        
    },[error,successfulReg]) 

    console.log(error)

    return ( 
        <div className="stakeholder-modal">

            <Snackbar open={successAlert}  onClose={handleCloseAlert} className='success'>
                <Alert onClose={handleCloseAlert} severity="success">
                    Stakeholder Created Successfully
                </Alert>
            </Snackbar>
            <h2>Create a stakeholder</h2>
            <form onSubmit={onSubmit}>

                    <div className="form-row">
                        <input 
                        type="text" 
                        name='first_name'
                        value={first_name}
                        onChange={handleChange}
                        placeholder="Enter stakeholder's first name" 
                        className="stakeholder-modal__field"/>  

                        <input 
                        type="text" 
                        placeholder="Enter stakeholder's last name" 
                        className="stakeholder-modal__field"
                        name='last_name'
                        value={last_name}
                        onChange={handleChange}/>
                    </div>

                    <div className="form-row">
                        <input 
                        type="text"
                        placeholder="Enter stakeholders email" 
                        className="stakeholder-modal__field"
                        name='email'
                        value={email}
                        onChange={handleChange}/>

                        <input type="text"
                        placeholder="Enter stakeholder's phone" 
                        className="stakeholder-modal__field"
                        name='phone'
                        value={phone}
                        onChange={handleChange}/>
                    </div>
                 

                    <div className="form-row">
                        <select name="state" id="states" className="stakeholder-modal__field" value={state} onChange={handleChange}>
                             <option value="" key='0'>Select Stakeholder's state of residence</option>
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
                            <option value="" key='0'>Select Stakeholder's LGA</option>
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
                        <input type="text"
                        placeholder="Enter stakeholder's profession" 
                        className="stakeholder-modal__field"
                        name='profession'
                        value={profession}
                        onChange={handleChange}/>

                        <input type="password" 
                        placeholder='Enter password' 
                        className="stakeholder-modal__field"
                        name='password'
                        value={password}
                        onChange={handleChange}/>
                    </div>

                    {stakeholderError.status ? <p className='error'>{stakeholderError.description}</p> : ''}
                    
                    <div className="actions">
                        <button className="stakeholder-modal__cancel" onClick={closeStakeholderModal}>Cancel</button>
                        <button variant="contained"
                            className='stakeholder-modal__submit' 
                            onClick={onSubmit} 
                            disabled={loading}>
                            {loading && <CircularProgress style={{color:'white'}} size={14} />}
                            {!loading && ' + New stakeholder'}
                        </button>
                    </div>
        
                </form>
        </div>
     );
}
 
export default StakeholderModal;