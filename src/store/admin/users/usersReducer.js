import
  {
    GET_USERS,
    USERS_ERROR,
    SET_CURRENT_USER,
    CLEAR_CURRENT_USER
  } from '../actionTypes';
const UsersReducer = (state,action)=>{
      switch(action.type){
        case GET_USERS:
          return{
            ...state,
            users: action.payload
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