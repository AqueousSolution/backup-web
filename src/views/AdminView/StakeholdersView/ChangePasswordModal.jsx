import { useState } from "react";

const ChangePasswordModal = ({stakeholderId, resetStakeholdersPassword, closePasswordModal, successfulPasswordChange, clearSuccessPassword}) => {

    const [passwordDetails, setPasswordDetails] = useState({
        password: '',
        password_confirmation: ''
    })

    const [error, setError] = useState('')

    const handleChange = (e) =>{
        setPasswordDetails({...passwordDetails,[e.target.name]:e.target.value})
    }

    const changePassword = (e) =>{
        e.preventDefault()
        setError('')

        if(passwordDetails.password.length<7 || passwordDetails.password_confirmation.length<7){
            setError('Passwords must be at least 7 characters long')
        }else if(passwordDetails.password !== passwordDetails.password_confirmation){
            setError('Passwords dont match')
        }else{
            resetStakeholdersPassword(stakeholderId,passwordDetails)
            setPasswordDetails({
                password: '',
                password_confirmation: ''
            })
            setTimeout(()=>clearSuccessPassword(), 4000)
            setTimeout(()=>closePasswordModal(), 5000)
        }
    }

    return (
        <div className='reset-password'>
            <h3>Reset Stakeholders Password</h3>

            <p className={error ? 'error' : 'success'}>{error ? error : (successfulPasswordChange ? 'Password Successfully Reset' : '' )}</p>

               
                <input type="text" placeholder=' New Password' name='password' value={passwordDetails.password} onChange={handleChange}/>

                <input type="text" placeholder='Confirm Password' name='password_confirmation' value={passwordDetails.password_confirmation} onChange={handleChange}/>
        

            <div className='reset-password__buttons'>
                <button className='btn-one' onClick={changePassword}>Change Password</button>
                <button className='btn-one' onClick={closePasswordModal}>Cancel</button>
            </div>
        </div>
      );
}
 
export default ChangePasswordModal;