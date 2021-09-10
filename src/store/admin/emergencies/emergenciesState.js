import axios from 'axios'
import React, { useReducer } from 'react';
import
{
  CLEAR_FILTER,
  CLEAR_SEARCH,
  FILTER_EMERGENCIES,
  SEARCH_EMERGENCIES,
  GET_EMERGENCIES,
  GET_EMERGENCIES_DETAILS,
  GET_EMERGENCIES_STATS,
  EMERGENCIES_ERROR,
} from '../actionTypes';

import EmergenciesContext from './emergenciesContext';
import EmergenciesReducer from './emergenciesReducer';
import setAuthToken from '../../../utils/setAuthToken'
import API_BASE from '../../api_base'

const EmergenciesState = props => {
  const initialState = {
    emergencies: null,
    emergencyDetails: null,
    searchResults: null,
    filterResults: null,
    emergenciesList: null,
    emergenciesStats:[],
    pageCount:1,
    error: null,
    state: [],
    lga:[],
  };

  const [state, dispatch] = useReducer(EmergenciesReducer, initialState);

    //Get all the emergencies from the DB
    const getEmergencies =  async (page) => {
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
      try{
        const res = await axios.get(`${API_BASE}/admin/emergencies/?page=${page}`)
        dispatch({type:GET_EMERGENCIES,payload:res.data.data})
      }catch(e){
        dispatch({type:EMERGENCIES_ERROR,payload:e})
      }
    };

    //Get all the emergencies from the DB
    const getEmergencyDetails =  async (emergencyId) => {
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
      try{
        const res = await axios.get(`${API_BASE}/admin/emergencies/${emergencyId}`)
        dispatch({type:GET_EMERGENCIES_DETAILS,payload:res.data.data})
      }catch(e){
        dispatch({type:EMERGENCIES_ERROR,payload:e})
      }
    };

        //Get all the emergencies from the DB
        const getEmergenciesStats =  async () => {
          if(localStorage.token){
            setAuthToken(localStorage.token)
          }
          try{
            const res = await axios.get(`${API_BASE}/admin/emergencies/statistics`)
            dispatch({type:GET_EMERGENCIES_STATS,payload:res.data.data})
          }catch(e){
            dispatch({type:EMERGENCIES_ERROR,payload:e})
          }
        };

    //Search for a particular emergency 
    const searchEmergencies = async (query) => {
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
      try{
        const res = await axios.get(`${API_BASE}/admin/emergencies/?search=${query}`)
        dispatch({type:SEARCH_EMERGENCIES,payload:res.data.data})
      }catch(e){
        dispatch({type:EMERGENCIES_ERROR,payload:e})
      }
    };

    //Filter emergency based on date
    const filterEmergencies = async (start,end) => {
      if(localStorage.token){
        setAuthToken(localStorage.token)
      }
      try{
        const res = await axios.get(`${API_BASE}/admin/emergencies/?from=${start} + &to=${end}`)
        dispatch({type:FILTER_EMERGENCIES,payload:res.data.data})
      }catch(e){
        dispatch({type:EMERGENCIES_ERROR,payload:e})
      }
    };

    const clearSearch = () =>{
      dispatch({type:CLEAR_SEARCH})
    }

    const clearFilter = () =>{
      dispatch({type:CLEAR_FILTER})
    }
  
  return (
    <EmergenciesContext.Provider
      value={{
        errors: state.errors,
        emergencies: state.emergencies,
        emergencyDetails: state.emergencyDetails,
        emergenciesList: state.emergenciesList,
        emergenciesStats: state.emergenciesStats,
        searchResults: state.searchResults,
        filterResults: state.filterResults,
        pageCount: state.pageCount,
        getEmergenciesStats,
        searchEmergencies,
        filterEmergencies,
        getEmergencies,
        getEmergencyDetails,
        clearSearch,
        clearFilter
      }}
    >
      {props.children}
    </EmergenciesContext.Provider>
  );
};

export default EmergenciesState;
