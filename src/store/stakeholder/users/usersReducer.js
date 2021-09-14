import
  {
    ACCEPT_EMERGENCY,
    GET_MY_EMERGENCIES,
    GET_USERS,
    USERS_ERROR,
    SET_CURRENT_USER,
    CLEAR_CURRENT_USER,
    IN_PROGRESS,
    GET_TIMELINE,
    ADD_TO__TIMELINE,
    GET_EMERGENCIES_INFO,
    CLEAR_ERROR
  } from '../actionTypes';
const UsersReducer = (state,action)=>{
      switch(action.type){
        case GET_USERS:
          return{
            ...state,
            allEmergencies: action.payload
          }
        case GET_MY_EMERGENCIES:
          return{
            ...state,
            myEmergencies: action.payload
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
              currentEmergency: action.payload
            }
        case CLEAR_CURRENT_USER:
              return{
                ...state,
                currentEmergency:null
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
           default:
                return state
      }
  }

  export default UsersReducer