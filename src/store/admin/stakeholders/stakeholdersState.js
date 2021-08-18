import React, { useReducer } from 'react';
import axios from 'axios'
import
{
    CREATE_STAKEHOLDER,
    GET_STAKEHOLDERS,
    LOAD_STAKEHOLDERS_DETAILS,
    SEARCH_STAKEHOLDERS,
    CLEAR_STAKEHOLDER_SEARCH,
    STAKEHOLDERS_ERROR,
    APPROVE_STAKEHOLDER,
    SUSPEND_STAKEHOLDER,
    UNSUSPEND_STAKEHOLDER,
    BLACKLIST_STAKEHOLDER,
    UNBLACKLIST_STAKEHOLDER,
    SET_CURRENT_STAKEHOLDER,
    CLEAR_CURRENT_STAKEHOLDER
} from '../actionTypes';

import StakeholdersContext from './stakeholdersContext';
import StakeholdersReducer from './stakeholdersReducer';
import axiosInstance from '../../../utils/axiosInstance';
import API_BASE from '../../api_base';
import setAuthToken from '../../../utils/setAuthToken'

const StakeholdersState = props => {
  const initialState = {
    stakeholders: [],
    searchResults: null,
    error: null,
    currentStakeholder: null,
    currentStakeholderDetails:[],
    searchedStakeholder:[],
    alert:'',
  };

  const [state, dispatch] = useReducer(StakeholdersReducer, initialState);

    //create a stakeholder
    const createStakeholder =  async (stakeholderDetails) => {
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
        try{
            const res = await axios.post(`${API_BASE}/admin/stakeholders/register`, stakeholderDetails)
            dispatch({type:CREATE_STAKEHOLDER,payload:res.data.data})
        }catch(e){
            dispatch({type:STAKEHOLDERS_ERROR,payload:e})
        }
    };

    //Get all the stakeholders from the DB
    const getStakeholders =  async () => {
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
      try{
        const res = await axios.get(`${API_BASE}/admin/stakeholders`,)
        dispatch({type:GET_STAKEHOLDERS,payload:res.data.data.data})
      }catch(e){
        dispatch({type:STAKEHOLDERS_ERROR,payload:e})
      }
    };

    //Get all the details of a particular stakeholder from the DB
    const getStakeholderDetails =  async (emergencyId) => {
        try{
            const res = await axiosInstance.get(`/admin/emergencies/emergencyId=${emergencyId}`)
            dispatch({type:LOAD_STAKEHOLDERS_DETAILS,payload:res.data.data})
        }catch(e){
            dispatch({type:STAKEHOLDERS_ERROR,payload:e})
        }
    };

    //Approve new stakeholders
    const approveStakeholder =  async (stakeholderId) => {
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
        try{
            const res = await axios.post(`${API_BASE}/admin/stakeholders/${stakeholderId}/approve`)
            dispatch({type:APPROVE_STAKEHOLDER,payload:res.data.message})
        }catch(e){
            dispatch({type:STAKEHOLDERS_ERROR,payload:e})
        }
    };
      
    //suspend a stakeholder
    const suspendStakeholder =  async (stakeholderId) => {
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
        try{
            const res = await axios.post(`/admin/stakeholders/${stakeholderId}/suspend`)
            dispatch({type:SUSPEND_STAKEHOLDER,payload:res.data.data})
        }catch(e){
            dispatch({type:STAKEHOLDERS_ERROR,payload:e})
        }
    };

    //reverse a suspended stakeholder
    const unSuspendStakeholder =  async (stakeholderId) => {
        try{
            const res = await axiosInstance.post(`/admin/stakeholders/stakeholderId=${stakeholderId}/unsuspend`)
            dispatch({type:UNSUSPEND_STAKEHOLDER,payload:res.data.data})
        }catch(e){
            dispatch({type:STAKEHOLDERS_ERROR,payload:e})
        }
    };

    //blacklist a stakeholder
    const blacklistStakeholder =  async (stakeholderId) => {
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
        try{
            const res = await axios.post(`${API_BASE}/admin/stakeholders/${stakeholderId}/blacklist`)
            dispatch({type:BLACKLIST_STAKEHOLDER,payload:res.data.data})
        }catch(e){
            dispatch({type:STAKEHOLDERS_ERROR,payload:e})
        }
    };

    //reverse a blacklisted stakeholder
    const unBlacklistStakeholder =  async (stakeholderId) => {
        try{
            const res = await axiosInstance.post(`/admin/stakeholders/stakeholderId=${stakeholderId}/unblacklist`)
            dispatch({type:UNBLACKLIST_STAKEHOLDER,payload:res.data.data})
        }catch(e){
            dispatch({type:STAKEHOLDERS_ERROR,payload:e})
        }
    };
    
    const setCurrentStakeholder = (stakeholder) =>{
        dispatch({type:SET_CURRENT_STAKEHOLDER,payload:stakeholder})
      }

      const clearCurrentStakeholder = () =>{
        dispatch({type:CLEAR_CURRENT_STAKEHOLDER})
      }

    //Search for a particular stakeholder 
    const searchStakeholders = async (query) => {

        if(localStorage.token){
          setAuthToken(localStorage.token)
        }
        try{
          const res = await axios.get(`${API_BASE}/admin/stakeholders/?search=${query}`)
          dispatch({type:SEARCH_STAKEHOLDERS,payload:res.data.data})
        }catch(e){
          dispatch({type:STAKEHOLDERS_ERROR,payload:e})
        }
    };

    const clearSearch = () =>{
      dispatch({type:CLEAR_STAKEHOLDER_SEARCH})
    }
  
  return (
    <StakeholdersContext.Provider
      value={{
        error: state.error,
        alert: state.alert,
        searchResults: state.searchResults,
        stakeholders: state.stakeholders,
        currentStakeholder: state.currentStakeholder,
        currentStakeholderDetails: state.currentStakeholderDetails,
        searchStakeholders,
        clearSearch,
        createStakeholder,
        getStakeholders,
        getStakeholderDetails,
        approveStakeholder,
        suspendStakeholder,
        unSuspendStakeholder,
        blacklistStakeholder,
        unBlacklistStakeholder,
        setCurrentStakeholder,
        clearCurrentStakeholder
      }}
    >
      {props.children}
    </StakeholdersContext.Provider>
  );
};

export default StakeholdersState;
