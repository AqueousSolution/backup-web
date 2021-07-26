import axiosInst from '../../utils/axiosInst'
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
   LOAD_ADMIN,
   CHANGE_PASSWORD,
   LOGOUT
  } from '../actionTypes';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axiosInstance from '../../utils/axiosInstance';
import setAuthToken from '../../utils/setAuthToken';
import API_BASE from '../api_base'

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    alert:'',
    isAuthenticated: null,
    adminUser:null,
    loading: true,
    selectedState:[],
    states: [],
    lgas: [],
    error: null
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
  const loadAdminUser= async () => {
    if(localStorage.token){
      setAuthToken(localStorage.token)
    }
    try {
      const res = await axios.get(`${API_BASE}/profile/show`);
      dispatch({ type: LOAD_ADMIN, payload: res.data.data});

    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err });
    } 
  };

    //Register User
    const registerAdmin = async formData => {
      try {
       await axiosInst.post(`/admin/register`, formData);
        dispatch({ type: REGISTER_SUCCESS, payload: formData});
      } catch (err) {
        dispatch({ type: REGISTER_FAIL, payload: err }); 
      }
    };

    //login User
  const loginAdmin = async loginDetails => {
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
  const logoutAdmin = () => {
      dispatch({ type: LOGOUT});
  
  };

    //change the password of an existing admin
    const changePassword = async passwordDetails => {
      try {
        const res = await axiosInstance.post(`/profile/change-password`, passwordDetails);
        dispatch({ type: CHANGE_PASSWORD, payload: res.data.success});
      } catch (err) {
        dispatch({ type: AUTH_ERROR, payload: err.response }); 
      }
    };
   
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        adminUser: state.adminUser,
        loading: state.loading,
        error: state.error,
        states:state.states,
        lgas:state.lgas,
        alert:state.alert,
        registerAdmin,
        loginAdmin,
        logoutAdmin,
        loadAdminUser,
        getStates,
        getLgas,
        changePassword
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
