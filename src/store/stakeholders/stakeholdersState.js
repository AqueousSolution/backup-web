import React, { useReducer } from 'react';
import
{
    CREATE_STAKEHOLDER,
    GET_STAKEHOLDERS,
    LOAD_STAKEHOLDERS_DETAILS,
    SEARCH_STAKEHOLDERS,
    STAKEHOLDERS_ERROR,
    APPROVE_STAKEHOLDER,
    SUSPEND_STAKEHOLDER,
    UNSUSPEND_STAKEHOLDER,
    BLACKLIST_STAKEHOLDER,
    UNBLACKLIST_STAKEHOLDER,
    SET_CURRENT_STAKEHOLDER
} from '../actionTypes';

import StakeholdersContext from './stakeholdersContext';
import StakeholdersReducer from './stakeholdersReducer';
import axiosInstance from '../../utils/axiosInstance';

const StakeholdersState = props => {
  const initialState = {
    stakeholders: null,
    error: null,
    currentStakeholder: [],
    currentStakeholderDetails:[],
    searchedStakeholder:[],
  };

  const [state, dispatch] = useReducer(StakeholdersReducer, initialState);

    //create a stakeholder
    const createStakeholder =  async (stakeholderId) => {
        try{
            const res = await axiosInstance.post(`/admin/stakeholders/register`)
            dispatch({type:CREATE_STAKEHOLDER,payload:res.data.data})
        }catch(e){
            dispatch({type:STAKEHOLDERS_ERROR,payload:e})
        }
    };

    //Get all the stakeholders from the DB
    const getStakeholders =  async () => {
      try{
        const res = await axiosInstance.get(`/admin/stakeholders`)
        dispatch({type:GET_STAKEHOLDERS,payload:res.data.data})
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
    const approveStakeholders =  async (stakeholderId) => {
        try{
            const res = await axiosInstance.post(`/admin/stakeholders/stakeholderId=${stakeholderId}/approve`)
            dispatch({type:APPROVE_STAKEHOLDER,payload:res.data.data})
        }catch(e){
            dispatch({type:STAKEHOLDERS_ERROR,payload:e})
        }
    };
      
    //suspend a stakeholder
    const suspendStakeholder =  async (stakeholderId) => {
        try{
            const res = await axiosInstance.post(`/admin/stakeholders/stakeholderId=${stakeholderId}/suspend`)
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
        try{
            const res = await axiosInstance.post(`/admin/stakeholders/stakeholderId=${stakeholderId}/blacklist`)
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

    //Search for a particular emergency 
    const searchStakeholders = async (userID) => {
      console.log('users')
      dispatch({type:SEARCH_STAKEHOLDERS})
    };
  
  return (
    <StakeholdersContext.Provider
      value={{
        error: state.error,
        stakeholders: state.stakeholders,
        currentStakeholder: state.currentStakeholder,
        currentStakeholderDetails: state.currentStakeholderDetails,
        searchStakeholders,
        createStakeholder,
        getStakeholders,
        getStakeholderDetails,
        approveStakeholders,
        suspendStakeholder,
        unSuspendStakeholder,
        blacklistStakeholder,
        unBlacklistStakeholder,
        setCurrentStakeholder
      }}
    >
      {props.children}
    </StakeholdersContext.Provider>
  );
};

export default StakeholdersState;
