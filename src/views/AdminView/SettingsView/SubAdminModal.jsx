import { useEffect, useContext, useState } from "react";
import AuthContext from "../../../store/admin/auth/authContext";
import StakeholdersContext from "../../../store/admin/stakeholders/stakeholdersContext";

const SubAdminModal = () => {

    const {getStates,getLgas,states, lgas } = useContext(AuthContext)
    const {createStakeholder} = useContext(StakeholdersContext)

    const[error,setError] = useState('')

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

    const onSubmit = (e) =>{
        e.preventDefault()
        console.log(regDetails)
        if(state.length<1 || lga.length<1 || first_name.length<1 || last_name.length<1 || email.length<1 || phone.length<1 || password.length<1 || profession.length<1){
            console.log('Please fill in all details')
        }else{
            if(password.length<7){
                console.log('password should be greater than 7 characters')
            }else if(phone.length !== 11){
                console.log('phone number should be 11 digits')
            }else{
                createStakeholder(regDetails)
            }
        }
        
    }

    return ( 
        <div className="stakeholder-modal">
            <h2>Create a Sub-Admin</h2>
            <form onSubmit={onSubmit}>
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
                            <option value="">Select Admin's state of residence</option>
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
                        placeholder="Enter admin's profession" 
                        className="stakeholder-modal__field"
                        name='profession'
                        value={profession}
                        onChange={handleChange}/>

                        <input type="password" 
                        placeholder="Enter admin's password" 
                        className="stakeholder-modal__field"
                        name='password'
                        value={password}
                        onChange={handleChange}/>
                    </div>
                    
             
                    <input type='submit' className="stakeholder-modal__submit"  value='Create admin'/>
                </form>
        </div>
     );
}
 
export default SubAdminModal;