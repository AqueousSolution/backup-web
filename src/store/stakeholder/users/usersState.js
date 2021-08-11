import axios from 'axios'
import React, { useReducer } from 'react';
import
  {
    ACCEPT_EMERGENCY,
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
    users: [],
    currentUser: null,
    error: null,
  };

  const [state, dispatch] = useReducer(UsersReducer, initialState);

 
  //Update user's profile
  const updateUserDetails= async profile => {
    console.log('users')
  };

    //Get all the users from the DB
    const getUsers =  async () => {
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
 
    //Respond to a user's emergency
    const acceptEmergency = async (emergencyId,status) => {
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

    const setCurrentUser = (user) =>{
      dispatch({type:SET_CURRENT_USER,payload:user})
    }

    const clearCurrentUser = () =>{
      dispatch({type:CLEAR_CURRENT_USER})
    }

  return (
    <UsersContext.Provider
      value={{
        errors: state.errors,
        users: state.users,
        currentUser: state.currentUser,
        updateUserDetails,
        acceptEmergency,
        searchUser,
        getUsers,
        deleteUser,
        setCurrentUser,
        clearCurrentUser,
        moveToInProgress
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersState;
