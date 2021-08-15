import axios from 'axios'
import React, { useReducer } from 'react';
import
{
  SEARCH_EMERGENCIES,
  GET_EMERGENCIES,
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
    const searchEmergencies = async (userID) => {
      console.log('users')
      dispatch({type:SEARCH_EMERGENCIES})
    };
  
  return (
    <EmergenciesContext.Provider
      value={{
        errors: state.errors,
        emergencies: state.emergencies,
        emergenciesList: state.emergenciesList,
        emergenciesStats: state.emergenciesStats,
        pageCount: state.pageCount,
        getEmergenciesStats,
        searchEmergencies,
        getEmergencies
      }}
    >
      {props.children}
    </EmergenciesContext.Provider>
  );
};

export default EmergenciesState;
