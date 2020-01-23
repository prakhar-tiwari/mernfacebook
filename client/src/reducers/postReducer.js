import { GET_FEED, SUBMIT_POST, GET_TIMELINE_FEED, CREATE_COMMENT, LIKE_COMMENT, CLEAR_POSTS } from '../actions/Types';

const initialState = {
    allPosts: [],
    timeLinePosts: [],
    hasMorePosts: true
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FEED:
            const allPosts = [...state.allPosts];
            const { data, hasMorePosts } = action.payload;
            return {
                ...state,
                allPosts: allPosts.concat(data),
                hasMorePosts: hasMorePosts
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
            const posts = [...state.allPosts];
            const comment = action.payload;
            posts.find(post => {
                if (post._id === comment.post) {
                    post.comments.push(comment)
                }
            })
            return {
                ...state,
                allPosts: posts
            }
        }

        case LIKE_COMMENT: {
            const posts = [...state.allPosts];
            posts.find(post => {
                if (post._id === action.payload._id) {
                    post.like = [...action.payload.like]
                }
            });
            return {
                ...state,
                allPosts: posts
            }

        }

        case CLEAR_POSTS: {
            return {
                ...state,
                allPosts: action.payload
            }
        }

        default:
            return state;
    }
}

export default postReducer;
