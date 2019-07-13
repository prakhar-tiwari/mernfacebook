import {GET_FEED,SUBMIT_POST} from '../actions/Types';

const initialState={
    allPosts:[]
}

const postReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_FEED:
            return{
                ...state,
                allPosts:action.payload
            }

        case SUBMIT_POST:
            return{
                ...state,
                allPosts:[action.payload,...state.allPosts]
            }

        default:
            return state;
    }
}

export default postReducer;