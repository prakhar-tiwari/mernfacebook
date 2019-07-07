import {SET_AUTH_USER} from '../actions/Types';

const initialState={
  isAuthenticated:false,
  user:{}
};

const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_AUTH_USER:
        return{
            ...state,
            isAuthenticated:!(Object.entries(action.payload).length === 0 && action.payload.constructor === Object),
            user:action.payload
        }

        default:
            return state;
    }
}

export default authReducer;