import axios from 'axios'
import React, { useReducer } from 'react';
import
  {
    ACCEPT_EMERGENCY,
    GET_MY_EMERGENCIES,
    GET_RESOLVED_EMERGENCIES,
    GET_REJECTED_EMERGENCIES,
    GET_EMERGENCIES_INFO,
    GET_TIMELINE,
    ADD_TO__TIMELINE,
    GET_USERS,
    SEARCH_EMERGENCIES,
    FILTER_EMERGENCIES,
    CLEAR_EMERGENCY_SEARCH,
    USERS_ERROR,
    CLEAR_ERROR,
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
    searchResults: null,
    filterResults: null,
    totalEmergencies: 1,
    totalCases:0,
    pageCount: 1,
    distressPageCount: 1,
    historyPageCount: 1,
    allEmergencies: [],
    rejectedEmergencies: [],
    myEmergencies:[],
    myResolvedEmergencies:[],
    emergencyInfo: null,
    timeline:[],
    currentEmergency: null,
    success:null,
    error: null,
  };

  const [state, dispatch] = useReducer(UsersReducer, initialState);

 
  //Update user's profile
  const updateUserDetails= async profile => {
    console.log('users')
  };

    //Get all the emergencies in stakeholder LGA from the DB
    const getEmergencies =  async (page) => {
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
      try {
        const res = await axios.get(`${API_BASE}/stakeholders/emergencies?resolution_status=accepted&resolution_status=pending&page=${page}`);
        dispatch({ type: GET_USERS, payload: res.data.data});

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
      const getMyEmergencies =  async (pageNumber) => {
        if(localStorage.token){
          setAuthToken(localStorage.token)
        }
        try {
          const res = await axios.get(`${API_BASE}/stakeholders/emergencies?resolution_status=resolved&?resolution_status=accepted&page=${pageNumber}`);
          dispatch({ type: GET_MY_EMERGENCIES, payload: res.data.data});
  
        } catch (err) {
          dispatch({ type: USERS_ERROR, payload: err });
        } 
      };   

          //Get all the emergencies in stakeholder LGA from the DB
          const getMyRejectedEmergencies =  async () => {
            if(localStorage.token){
              setAuthToken(localStorage.token)
            }
            try {
              const res = await axios.get(`${API_BASE}/stakeholders/emergencies?resolution_status=rejected`);
              dispatch({ type: GET_REJECTED_EMERGENCIES, payload: res.data.data.data});
      
            } catch (err) {
              dispatch({ type: USERS_ERROR, payload: err });
            } 
          };   
      
      //Get all the emergencies in stakeholder LGA from the DB
      const getResolvedEmergencies =  async () => {
        if(localStorage.token){
          setAuthToken(localStorage.token)
        }
        try {
          const res = await axios.get(`${API_BASE}/stakeholders/emergencies?resolution_status=resolved`);
          dispatch({ type: GET_RESOLVED_EMERGENCIES, payload: res.data.data});
  
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

      const addToTimeline =  async (emergencyID,data) => {
        if(localStorage.token){
          setAuthToken(localStorage.token)
        }
        try {
          const res = await axios.post(`${API_BASE}/stakeholders/emergencies/${emergencyID}/timelines`,data);
          dispatch({ type: ADD_TO__TIMELINE, payload: res.data});
  
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
      const searchEmergency = async (query) => {

        if(localStorage.token){
          setAuthToken(localStorage.token)
        }
        try{
          const res = await axios.get(`${API_BASE}/stakeholders/emergencies/?search=${query}`)
          dispatch({type:SEARCH_EMERGENCIES,payload:res.data.data})
        }catch(e){
          dispatch({type:USERS_ERROR,payload:e})
        }
  
      };

          //Filter emergency based on date
    const filterEmergencies = async (start,end) => {
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
      try{
        const res = await axios.get(`${API_BASE}/stakeholders/emergencies/?resolution_status=accepted&from=${start} + &to=${end}`)
        dispatch({type:FILTER_EMERGENCIES,payload:res.data.data})
      }catch(e){
        dispatch({type:USERS_ERROR,payload:e})
      }
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

    const clearError = () =>{
      dispatch({type:CLEAR_ERROR})
    }

    const clearSearch = () =>{
      dispatch({type:CLEAR_EMERGENCY_SEARCH})
    }

  return (
    <UsersContext.Provider
      value={{
        errors: state.errors,
        allEmergencies: state.allEmergencies,
        myEmergencies: state.myEmergencies,
        myResolvedEmergencies: state.myResolvedEmergencies,
        currentEmergency: state.currentEmergency,
        timeline:state.timeline,
        emergencyInfo: state.emergencyInfo,
        success: state.success,
        totalEmergencies: state.totalEmergencies,
        totalCases: state.totalCases,
        pageCount: state.pageCount,
        historyPageCount: state.historyPageCount,
        distressPageCount: state.distressPageCount,
        searchResults: state.searchResults,
        filterResults: state.filterResults,
        rejectedEmergencies: state.rejectedEmergencies,
        getResolvedEmergencies,
        getMyRejectedEmergencies,
        updateUserDetails,
        respondToEmergency,
        searchEmergency,
        filterEmergencies,
        getEmergencies,
        getEmergencyDetails,
        getEmergencyTimeline,
        addToTimeline,
        getMyEmergencies,
        deleteUser,
        setCurrentEmergency,
        clearCurrentEmergency,
        moveToInProgress,
        clearError,
        clearSearch
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersState;
