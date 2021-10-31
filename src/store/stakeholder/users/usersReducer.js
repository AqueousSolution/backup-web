
import
  {
    ACCEPT_EMERGENCY,
    GET_MY_EMERGENCIES,
    GET_REJECTED_EMERGENCIES,
    GET_RESOLVED_EMERGENCIES,
    GET_USERS,
    USERS_ERROR,
    SET_CURRENT_USER,
    CLEAR_CURRENT_USER,
    IN_PROGRESS,
    GET_TIMELINE,
    ADD_TO__TIMELINE,
    GET_EMERGENCIES_INFO,
    FILTER_EMERGENCIES,
    SEARCH_EMERGENCIES,
    CLEAR_ERROR,
    CLEAR_EMERGENCY_SEARCH
  } from '../actionTypes';
const UsersReducer = (state,action)=>{
      switch(action.type){
        case GET_USERS:
          return{
            ...state,
            allEmergencies: action.payload.data,
            totalEmergencies: action.payload.total_count,
            pageCount: action.payload.page_count,
            distressPageCount: action.payload.page_count,
          }
        case GET_MY_EMERGENCIES:
          return{
            ...state,
            historyPageCount: action.payload.page_count,
            pageCount: action.payload.page_count,
            totalCases: action.payload.total_count,
            myEmergencies: action.payload.data
          }
          case GET_REJECTED_EMERGENCIES:
            return{
              ...state,
              rejectedEmergencies: action.payload
            }
          case GET_RESOLVED_EMERGENCIES:
            return{
              ...state,
              myResolvedEmergencies: action.payload
            }
          case GET_EMERGENCIES_INFO:
            return{
              ...state,
              emergencyInfo: action.payload
            }
        case GET_TIMELINE:
          return{
            ...state,
            timeline: action.payload
          }
        case ADD_TO__TIMELINE:
          return{
            ...state,
            success: action.payload
          }
          case SEARCH_EMERGENCIES:
            return{
              ...state,
              searchResults: action.payload
            }
            case FILTER_EMERGENCIES:
            return{
              ...state,
              filterResults: action.payload
            }
        case ACCEPT_EMERGENCY:
          return{
            ...state,
            success: action.payload
          }
        case IN_PROGRESS:
          return{
            ...state,
          }
        case SET_CURRENT_USER:
            return{
              ...state,
              currentEmergency: action.payload,
            }
        case CLEAR_CURRENT_USER:
              return{
                ...state,
                currentEmergency:null,
                emergencyInfo: null
              }
        case USERS_ERROR:
          return{
            ...state,
            error:action.payload
          }
          case CLEAR_ERROR:
            return{
              ...state,
              success: null,
              error: null
            }
          case CLEAR_EMERGENCY_SEARCH:
            return{
              ...state,
             filterResults: null,
             searchResults: null
            }
           default:
                return state
      }
  }

  export default UsersReducer