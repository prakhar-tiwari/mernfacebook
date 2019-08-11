import {SET_TIMELINE_USER, GET_FRIENDS} from '../actions/Types';

const initialState={
    timeLineUser:[],
    friends:[],
    socket:null
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

        case 'SOCKET_CONNECT':
            return{
                ...state,
                socket:action.payload
            }

        default: return state
    }
}

export default profileReducer;