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
    CLEAR_STAKEHOLDER_SEARCH,
    CLEAR_ERROR,
    CLEAR_REG,
    CLEAR_APPROVAL,
    GET_STAKEHOLDERS_STATS,
    RESET_PASSWORD,
    CLEAR_PASSWORD
  } from '../actionTypes';

  const StakeholdersReducer = (state,action)=>{
      switch(action.type){
        case GET_STAKEHOLDERS:
          return{
            ...state,
            stakeholders: action.payload.data,
            pageCount: action.payload.page_count,
            totalStakeholders: action.payload.total_count
          }
        case GET_STAKEHOLDERS_STATS:
          return{
            ...state,
            stats: action.payload
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
              approvalSuccess: action.payload
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
                stakeholders:[...state.stakeholders,action.payload],
                successfulReg: action.payload
            }
          case RESET_PASSWORD:
            return{
                ...state,
                successfulPasswordChange: action.payload
            }
          case CLEAR_PASSWORD:
            return{
                ...state,
                successfulPasswordChange: null
            }
        case STAKEHOLDERS_ERROR:
            return{
                ...state,
                error:action.payload
            }
        case CLEAR_ERROR:
          return{
              ...state,
              error:null
          }
        case CLEAR_REG:
          return{
              ...state,
              successfulReg:null
          }
        case CLEAR_APPROVAL:
          return{
            ...state,
            approvalSuccess:null
        }
           default:
                return state
      }
  }

  export default StakeholdersReducer