import { GET_FEED, SUBMIT_POST, GET_TIMELINE_FEED, CREATE_COMMENT } from '../actions/Types';

const initialState = {
    allPosts: [],
    timeLinePosts: []
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FEED:
            return {
                ...state,
                allPosts: action.payload
            }

        case SUBMIT_POST:
            return {
                ...state,
                allPosts: [action.payload, ...state.allPosts]
            }

        case GET_TIMELINE_FEED:
            return {
                ...state,
                timeLinePosts: action.payload
            }
        case CREATE_COMMENT: {
            const posts=[...state.allPosts];
            const comment=action.payload;
            posts.find(post=>{
                if(post._id === comment.post){
                    post.comments.push(comment)
                }
            })
            return{
                ...state,
                allPosts:posts
            }
        }

        default:
            return state;
    }
}

export default postReducer;