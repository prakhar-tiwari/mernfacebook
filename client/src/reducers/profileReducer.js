import {SET_TIMELINE_USER} from '../actions/Types';

const initialState={
    timeLineUser:[]
}

const profileReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_TIMELINE_USER:
            return{
                ...state,
                timeLineUser:action.payload
            }

        default: return state
    }
}

export default profileReducer;