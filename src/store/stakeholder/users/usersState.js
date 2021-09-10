import axios from 'axios'
import React, { useReducer } from 'react';
import
  {
    ACCEPT_EMERGENCY,
    GET_MY_EMERGENCIES,
    GET_EMERGENCIES_INFO,
    GET_TIMELINE,
    GET_USERS,
    USERS_ERROR,
    SET_CURRENT_USER,
    CLEAR_CURRENT_USER,
    IN_PROGRESS
  } from '../actionTypes';
import UsersContext from './usersContext';
import UsersReducer from './usersReducer';
//import axiosInstance from '../../utils/axiosInstance';
import setAuthToken from '../../../utils/setAuthToken'
import API_BASE from '../../api_base'

const UsersState = props => {
  const initialState = {
    allEmergencies: [],
    myEmergencies:[],
    emergencyInfo: null,
    timeline:[],
    currentEmergency: null,
    error: null,
  };

  const [state, dispatch] = useReducer(UsersReducer, initialState);

 
  //Update user's profile
  const updateUserDetails= async profile => {
    console.log('users')
  };

    //Get all the emergencies in stakeholder LGA from the DB
    const getEmergencies =  async () => {
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
      try {
        const res = await axios.get(`${API_BASE}/stakeholders/emergencies`);
        dispatch({ type: GET_USERS, payload: res.data.data.data});

      } catch (err) {
        dispatch({ type: USERS_ERROR, payload: err });
      } 
    };

    //Get all the emergencies details from the DB
    const getEmergencyDetails =  async (emergencyId) => {
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
      try{
        const res = await axios.get(`${API_BASE}/stakeholders/emergencies/${emergencyId}`)
        dispatch({type:GET_EMERGENCIES_INFO,payload:res.data.data})
      }catch(e){
        dispatch({type:USERS_ERROR,payload:e})
      }
    };

      //Get all the emergencies in stakeholder LGA from the DB
      const getMyEmergencies =  async () => {
        if(localStorage.token){
          setAuthToken(localStorage.token)
        }
        try {
          const res = await axios.get(`${API_BASE}/stakeholders/emergencies?resolution_status=accepted`);
          dispatch({ type: GET_MY_EMERGENCIES, payload: res.data.data.data});
  
        } catch (err) {
          dispatch({ type: USERS_ERROR, payload: err });
        } 
      };

    //Get all the emergencies in stakeholder LGA from the DB
    const getEmergencyTimeline =  async (emergencyID) => {
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
      try {
        const res = await axios.get(`${API_BASE}/stakeholders/emergencies/${emergencyID}/timelines`);
        dispatch({ type: GET_TIMELINE, payload: res.data.data.data});

      } catch (err) {
        dispatch({ type: USERS_ERROR, payload: err });
      } 
          };
 
    //Respond to a user's emergency
    const respondToEmergency = async (emergencyId,status) => {
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
        const res = await axios.post(`${API_BASE}/stakeholders/emergencies/${emergencyId}/respond`,{status:status},config);
        dispatch({ type: ACCEPT_EMERGENCY, payload: res.data.data.data});

      } catch (err) {
        dispatch({ type: USERS_ERROR, payload: err });
      } 
    };

    //Start work on a user's emergency
    const moveToInProgress = async (emergencyId) => {
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
      try {
        const res = await axios.post(`${API_BASE}/stakeholders/emergencies/${emergencyId}/timelines`);
        dispatch({ type: IN_PROGRESS, payload: res.data.data.data});

      } catch (err) {
        dispatch({ type: USERS_ERROR, payload: err });
      } 
    };
    //Search for a particular User 
    const searchUser = async (userID) => {
      console.log('users')
    };
  
    //Delete a particular User 
    const deleteUser = async (userID) => {
      console.log('users')
    };

    const setCurrentEmergency = (user) =>{
      dispatch({type:SET_CURRENT_USER,payload:user})
    }

    const clearCurrentEmergency = () =>{
      dispatch({type:CLEAR_CURRENT_USER})
    }

  return (
    <UsersContext.Provider
      value={{
        errors: state.errors,
        allEmergencies: state.allEmergencies,
        myEmergencies: state.myEmergencies,
        currentEmergency: state.currentEmergency,
        timeline:state.timeline,
        emergencyInfo: state.emergencyInfo,
        updateUserDetails,
        respondToEmergency,
        searchUser,
        getEmergencies,
        getEmergencyDetails,
        getEmergencyTimeline,
        getMyEmergencies,
        deleteUser,
        setCurrentEmergency,
        clearCurrentEmergency,
        moveToInProgress
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersState;
