import {SET_TIMELINE_USER, GET_FRIENDS} from '../actions/Types';

const initialState={
    timeLineUser:[],
    friends:[]
}

const profileReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_TIMELINE_USER:
            return{
                ...state,
                timeLineUser:action.payload
            }

        case GET_FRIENDS:
            return{
                ...state,
                friends:action.payload
            }

        default: return state
    }
}

export default profileReducer;