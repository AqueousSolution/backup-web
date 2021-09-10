import axiosInst from '../../../utils/axiosInst'
import axios from 'axios'
import React, { useReducer } from 'react';
import
  {
   GET_STATES,
   GET_LGAS,
   LOCATION_ERROR,
   REGISTER_FAIL,
   REGISTER_SUCCESS,
   LOGIN_FAIL,
   LOGIN_SUCCESS,
   AUTH_ERROR,
   CLEAR_ERROR,
   LOAD_STAKEHOLDER,
   EDIT_STAKEHOLDER,
   CHANGE_PASSWORD,
   FORGOT_PASSWORD,
   FORGOT_PASSWORD_ERROR,
   RESET_PASSWORD,
   LOGOUT
  } from '../actionTypes';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import setAuthToken from '../../../utils/setAuthToken';
import API_BASE from '../../api_base'

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    successfulReg: null,
    alert:'',
    isAuthenticated: null,
    stakeholderUser:null,
    loading: true,
    selectedState:[],
    states: [{name:'Select your state'}],
    lgas: [],
    error: null,
    forgotPasswordError: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const getStates =  async () => {
 
    try{
      const res =  await axiosInst.get(`/location/states`)
      dispatch({type:GET_STATES,payload:res.data.data})
    }catch(e){
      dispatch({type:LOCATION_ERROR,payload:e})
    }
  };

  const getLgas =  async (state) => {
    try{
      const res = await axiosInst.get(`/location/states/${state}/lga`)
      dispatch({type:GET_LGAS,payload:res.data.data.data})
    }catch(e){
      dispatch({type:LOCATION_ERROR,payload:e})
    }
  };
 
  //Load Admin User
  const loadStakeholderUser= async () => {
    if(localStorage.token){
      setAuthToken(localStorage.token)
    }
    try {
      const res = await axios.get(`${API_BASE}/profile/show`);
      dispatch({ type: LOAD_STAKEHOLDER, payload: res.data.data});

    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err });
    } 
  };

  //Load Admin User
  const editStakeholderProfile= async (profile) => {
    if(localStorage.token){
      setAuthToken(localStorage.token)
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    try {
      const res = await axios.post(`${API_BASE}/profile/update`,profile,config);
      dispatch({ type: EDIT_STAKEHOLDER, payload: res.data.data});

    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err });
    } 
  };

    //Register User
    const registerStakeholder = async formData => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      try {
       await axiosInst.post(`/stakeholders/register`, formData,config);
        dispatch({ type: REGISTER_SUCCESS, payload: formData});
      } catch (err) {
        dispatch({ type: REGISTER_FAIL, payload: err }); 
      }
    };

    //login User
  const loginStakeholder = async loginDetails => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, loginDetails,config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.data});
    } catch (err) {
      dispatch({ type:  LOGIN_FAIL, payload: err.response }); 
    }
  };

  //logout Admin
  const logoutStakeholder = () => {
      dispatch({ type: LOGOUT});
  
  };

    //change the password of an existing admin
    const changePassword = async passwordDetails => {
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
      try {
        const res = await axios.post(`${API_BASE}/profile/change-password`, passwordDetails);
        dispatch({ type: CHANGE_PASSWORD, payload: res.data.success});
      } catch (err) {
        dispatch({ type: AUTH_ERROR, payload: err.response }); 
      }
    };



    //change the password of an existing stakeholder
    const forgotPassword = async email => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      try {
        const res = await axios.post(`${API_BASE}/password/request`, email, config);
        dispatch({ type: FORGOT_PASSWORD, payload: res.data});
      } catch (err) {
        dispatch({ type: FORGOT_PASSWORD_ERROR, payload: err.response }); 
      }
    };

    
    //change the password of an existing stakeholder
    const resetPassword = async passwordDetails => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };
      try {
        const res = await axios.post(`${API_BASE}/password/reset`, passwordDetails, config);
        dispatch({ type: RESET_PASSWORD, payload: res.data});
      } catch (err) {
        dispatch({ type: FORGOT_PASSWORD_ERROR, payload: err.response }); 
      }
    };

    const clearError = () =>{
      dispatch({ type: CLEAR_ERROR});
    }

 
   
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        stakeholderUser: state.stakeholderUser,
        loading: state.loading,
        error: state.error,
        forgotPasswordError: state.forgotPasswordError,
        states:state.states,
        lgas:state.lgas,
        alert:state.alert,
        successfulReg: state.successfulReg,
        registerStakeholder,
        loginStakeholder,
        logoutStakeholder,
        loadStakeholderUser,
        editStakeholderProfile,
        getStates,
        getLgas,
        changePassword,
        forgotPassword,
        clearError,
        resetPassword
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
