import axios from 'axios'
import ProfilePic2 from '../../assets/profilePhoto2.png'
import ProfilePic from '../../assets/profilePhoto.png'
import React, { useReducer } from 'react';
import
  {
    LOAD_USER_DETAILS,
    GET_USERS,
    USERS_ERROR,
    SET_CURRENT_USER,
    CLEAR_CURRENT_USER
  } from '../actionTypes';
import UsersContext from './usersContext';
import UsersReducer from './usersReducer';
//import axiosInstance from '../../utils/axiosInstance';
import setAuthToken from '../../utils/setAuthToken'
import API_BASE from '../api_base'

const UsersState = props => {
  const initialState = {
    users: [
      {
        id:1,
        fullName: 'John Doe',
        phone: '08167222136',
        profilePic: ProfilePic2,
        emergencyContacts: [
          {
            fullName:'John James',
            status:'pending',
            profilePic:ProfilePic,
          },
          {
            fullName:'Paul Play',
            status:'pending',
            profilePic:ProfilePic,
          }
    ],
      },
      {
        id:2,
        fullName: 'Sarah P.',
        phone: '09077777890',
        profilePic: ProfilePic,
        emergencyContacts: [
          {
            fullName:'Whitney Houston',
            status:'pending',
            profilePic:ProfilePic,
          },
          {
            fullName:'Beyonce Knowles',
            status:'pending',
            profilePic:ProfilePic,
          }
    ],
  },
      {
        id:3,
        fullName: 'Sharon S.',
        phone: '07012345678',
        profilePic: ProfilePic,
        emergencyContacts: [
          {
            fullName:'Whitney Houston',
            status:'pending',
            profilePic:ProfilePic,
          },
          {
            fullName:'Beyonce Knowles',
            status:'pending',
            profilePic:ProfilePic,
          }
    ],
      }
    ],
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
        const res = await axios.get(`${API_BASE}/admin/users`);
        dispatch({ type: GET_USERS, payload: res.data.data.data});

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
        getUserDetails,
        searchUser,
        getUsers,
        deleteUser,
        setCurrentUser,
        clearCurrentUser
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersState;
