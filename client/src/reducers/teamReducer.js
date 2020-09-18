import {GET_TEAM , TEAM_LOADING} from '../actions/types';
const initialState = {
    team: [],
    loading: false
  }
  export default function(state = initialState, action) {
    console.log("comes in reducer:",action.payload);
    switch(action.type) {
        
      case TEAM_LOADING:
        return{
          ...state,
          loading:true
        };
        case GET_TEAM:
            console.log("from reducer:",action.payload);
          return{
            ...state,
            team:action.payload,
            loading:false
            
          };
        default:
            return state;
    }
  }