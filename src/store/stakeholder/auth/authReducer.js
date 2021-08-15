import
  {
   REGISTER_FAIL,
   REGISTER_SUCCESS,
   LOGIN_FAIL,
   LOGIN_SUCCESS,
   AUTH_ERROR,
   CLEAR_ERROR,
   LOAD_STAKEHOLDER,
   GET_STATES,
   GET_LGAS,
   LOCATION_ERROR,
   CHANGE_PASSWORD,
   LOGOUT
  } from '../actionTypes';

const AuthReducer = (state,action)=>{
      switch(action.type){
        case GET_LGAS:
              return{
                ...state,
               lgas: action.payload,
              }
        case GET_STATES:
          return{
            ...state,
            states: action.payload
          }
        case LOCATION_ERROR:
          return{
            ...state,
            error: action.payload,
          }
          case REGISTER_SUCCESS:
              localStorage.setItem('token',action.payload.token);
              return{
                ...state,
                ...action.payload,
                isAthenticated: true,
                loading: false
              }
           case REGISTER_FAIL:
                localStorage.removeItem('token');
                return{
                  ...state,
                  token: null,
                  isAthenticated: false,
                  loading: false,
                  error: action.payload
                }
          case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return{
              ...state,
              stakeholderUser: action.payload.user,
              isAthenticated: true,
              loading: false
            }
          case LOGIN_FAIL:
              localStorage.removeItem('token');
              return{
                ...state,
                token: null,
                isAthenticated: false,
                loading: false,
                error: action.payload
              }
          case LOGOUT:
             localStorage.removeItem('token');
             return{
              ...state,
              token: null,
              isAthenticated: false,
              loading: false,
              error: action.payload
            }
           case  LOAD_STAKEHOLDER:
               return{
                   ...state,
                   stakeholderUser: action.payload,
                   isAthenticated: true,
                   loading: false
               }
          case  CHANGE_PASSWORD:
            return{
                ...state,
                alert: action.payload
            }
          case  AUTH_ERROR:
            return{
              ...state,
              error:action.payload
            }
        case  CLEAR_ERROR:
          return{
            ...state,
            error:null
          }
           default:
                return state
      }
  }

  export default AuthReducer