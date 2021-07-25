import
  {
    CREATE_STAKEHOLDER,
    GET_STAKEHOLDERS,
    LOAD_STAKEHOLDERS_DETAILS,
    STAKEHOLDERS_ERROR,
    SET_CURRENT_STAKEHOLDER
  } from '../actionTypes';
const StakeholdersReducer = (state,action)=>{
      switch(action.type){
        case GET_STAKEHOLDERS:
          return{
            ...state,
            stakeholders: action.payload
          }
        case LOAD_STAKEHOLDERS_DETAILS:
            return{
                ...state,
                currentStakeholderDetails: action.payload
            }
        case SET_CURRENT_STAKEHOLDER:
            return{
            ...state,
            currentStakeholder: action.payload
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