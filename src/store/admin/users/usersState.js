import axios from 'axios'
import React, { useReducer } from 'react';
import
  {
    LOAD_USER_DETAILS,
    GET_USERS,
    USERS_ERROR,
    SET_CURRENT_USER,
    CLEAR_CURRENT_USER,
    GET_EMERGENCY_CONTACTS,
    SEARCH_USERS,
    CLEAR_USER_SEARCH
  } from '../actionTypes';
import UsersContext from './usersContext';
import UsersReducer from './usersReducer';
//import axiosInstance from '../../utils/axiosInstance';
import setAuthToken from '../../../utils/setAuthToken'
import API_BASE from '../../api_base'

const UsersState = props => {
  const initialState = {
    users: [],
    searchResults: null,
    totalUsers: 1,
    pageCount: 1,
    currentUser: null,
    currentUserDetails: null,
    error: null,
  };

  const [state, dispatch] = useReducer(UsersReducer, initialState);

 
  //Update user's profile
  const updateUserDetails= async profile => {
    console.log('users')
  };

    //Get all the users from the DB
    const getUsers =  async (page) => {
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
      try {
        const res = await axios.get(`${API_BASE}/admin/users?page=${page}`);
        dispatch({ type: GET_USERS, payload: res.data.data});

      } catch (err) {
        dispatch({ type: USERS_ERROR, payload: err });
      } 
    };
 
    //Get User profile
    const getUserDetails = async (userId) => {
      try {
        const res = await axios.get(`${API_BASE}/admin/users/userId=${userId}`);
        dispatch({ type: LOAD_USER_DETAILS, payload: res.data.data.data});

      } catch (err) {
        dispatch({ type: USERS_ERROR, payload: err });
      } 
    };

    //Get User profile
    const getCurrentUserDetails = async (userId) => {
      try {
        const res = await axios.get(`${API_BASE}/admin/users/${userId}`);
        dispatch({ type: GET_EMERGENCY_CONTACTS, payload: res.data.data});

      } catch (err) {
        dispatch({ type: USERS_ERROR, payload: err });
      } 
    };

    //Search for a particular User 
    const searchUser = async (query) => {

      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
      try{
        const res = await axios.get(`${API_BASE}/admin/users/?search=${query}`)
        dispatch({type:SEARCH_USERS,payload:res.data.data})
      }catch(e){
        dispatch({type:USERS_ERROR,payload:e})
      }

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

    const clearSearch = () =>{
      dispatch({type:CLEAR_USER_SEARCH})
    }

  return (
    <UsersContext.Provider
      value={{
        errors: state.errors,
        users: state.users,
        totalUsers: state.totalUsers,
        pageCount: state.pageCount,
        currentUser: state.currentUser,
        currentUserDetails: state.currentUserDetails,
        searchResults: state.searchResults,
        updateUserDetails,
        getUserDetails,
        getCurrentUserDetails,
        searchUser,
        getUsers,
        deleteUser,
        setCurrentUser,
        clearSearch,
        clearCurrentUser
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersState;
