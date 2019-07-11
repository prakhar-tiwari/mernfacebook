import {SET_TAGGED_FRIENDS} from '../actions/Types';

const initialState={
    taggedFriends:[]
}

const postReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_TAGGED_FRIENDS:
            return{
                ...state,
                taggedFriends:action.payload
            }

        default:
            return state;
    }
}

export default postReducer;