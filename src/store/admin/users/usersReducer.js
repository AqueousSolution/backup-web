import
  {
    GET_USERS,
    GET_EMERGENCY_CONTACTS,
    USERS_ERROR,
    SET_CURRENT_USER,
    CLEAR_CURRENT_USER,
    SEARCH_USERS
  } from '../actionTypes';
  
const UsersReducer = (state,action)=>{
      switch(action.type){
        case GET_USERS:
          return{
            ...state,
            users: action.payload.data,
            totalUsers: action.payload.total_count,
            pageCount: action.payload.page_count,
          }
        case GET_EMERGENCY_CONTACTS:
          return{
            ...state,
            currentUserDetails: action.payload
          }
        case SEARCH_USERS:
          return{
            ...state,
            searchResults: action.payload
          }
          case SET_CURRENT_USER:
              return{
                ...state,
                currentUser: action.payload
              }
          case CLEAR_CURRENT_USER:
                return{
                  ...state,
                  currentUser:null
                }
          case USERS_ERROR:
            return{
              ...state,
              error:action.payload
            }
           default:
                return state
      }
  }

  export default UsersReducer