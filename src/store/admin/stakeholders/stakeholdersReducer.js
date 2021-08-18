import
  {
    CREATE_STAKEHOLDER,
    GET_STAKEHOLDERS,
    LOAD_STAKEHOLDERS_DETAILS,
    STAKEHOLDERS_ERROR,
    SET_CURRENT_STAKEHOLDER,
    CLEAR_CURRENT_STAKEHOLDER,
    APPROVE_STAKEHOLDER,
    SEARCH_STAKEHOLDERS,
    CLEAR_STAKEHOLDER_SEARCH
  } from '../actionTypes';
const StakeholdersReducer = (state,action)=>{
      switch(action.type){
        case GET_STAKEHOLDERS:
          return{
            ...state,
            stakeholders: action.payload
          }
        case SEARCH_STAKEHOLDERS:
          return{
            ...state,
            searchResults: action.payload
          }
        case CLEAR_STAKEHOLDER_SEARCH:
          return{
            ...state,
            searchResults: null
          }
        case LOAD_STAKEHOLDERS_DETAILS:
          return{
              ...state,
              currentStakeholderDetails: action.payload
          }
        case APPROVE_STAKEHOLDER:
          return{
              ...state,
              alert: action.payload
          }
        case SET_CURRENT_STAKEHOLDER:
            return{
            ...state,
            currentStakeholder: action.payload
            }
        case CLEAR_CURRENT_STAKEHOLDER:
          return{
          ...state,
          currentStakeholder: null,
          }
        case CREATE_STAKEHOLDER:
            return{
                ...state,
                stakeholders:[...state.stakeholders,action.payload]
            }
        case STAKEHOLDERS_ERROR:
            return{
                ...state,
                error:action.payload
            }
           default:
                return state
      }
  }

  export default StakeholdersReducer