import
  {
    SEARCH_EMERGENCIES,
    GET_EMERGENCIES,
    EMERGENCIES_ERROR,
  } from '../actionTypes';

const EmergenciesReducer = (state,action)=>{
      switch(action.type){
          case SEARCH_EMERGENCIES:
              return{
                ...state,
              }
          case GET_EMERGENCIES:
              return{
                ...state,
                emergencies:action.payload
              }
          case EMERGENCIES_ERROR:
            return{
              ...state,
              error: action.payload
            }
           default:
                return state
      }
  }

  export default EmergenciesReducer