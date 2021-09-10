import
  {
    CLEAR_SEARCH,
    FILTER_EMERGENCIES,
    SEARCH_EMERGENCIES,
    GET_EMERGENCIES,
    GET_EMERGENCIES_DETAILS,
    GET_EMERGENCIES_STATS,
    EMERGENCIES_ERROR,
    CLEAR_FILTER,
  } from '../actionTypes';

const EmergenciesReducer = (state,action)=>{
      switch(action.type){
         case SEARCH_EMERGENCIES:
            return{
              ...state,
              searchResults: action.payload,
          }
        case FILTER_EMERGENCIES:
          return{
            ...state,
            filterResults: action.payload,
        }
        case CLEAR_SEARCH:
          return{
            ...state,
            searchResults: null,
        }
        case CLEAR_FILTER:
          return{
            ...state,
            filterResults: null,
        }
       case GET_EMERGENCIES:
          return{
            ...state,
            emergencies:action.payload,
            emergenciesList: action.payload.data,
            pageCount: action.payload.page_count
          }
          case GET_EMERGENCIES_DETAILS:
            return{
              ...state,
           emergencyDetails: action.payload
            }
          case GET_EMERGENCIES_STATS:
            return{
              ...state,
              emergenciesStats:action.payload,
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