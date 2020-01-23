import { GET_FEED, SUBMIT_POST, CLEAR_POSTS, CREATE_COMMENT, LIKE_COMMENT } from './Types';
import axios from 'axios';


export const getFeed = (id, start, count) => dispatch => {
    axios.post('/getfeed', { userId: id, start, count })
        .then(result => {
            dispatch({
                type: GET_FEED,
                payload: {
                    data: result.data,
                    hasMorePosts: (result.data.length) ? true : false
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const submitPost = (newPost) => dispatch => {
    axios.post('/submitpost', newPost)
        .then(result => {
            dispatch({
                type: SUBMIT_POST,
                payload: result.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}

export const likePost = (postId, id) => dispatch => {
    axios.post('/likepost', {
        postId: postId,
        userId: id
    })
        .then(result => {
            dispatch({
                type: LIKE_COMMENT,
                payload: result.data
            })
        })
        .catch(err => {
            console.log(err);
        })
}

export const createComment = (userId, postId, text) => {
    return dispatch => {
        axios.post('/createcomment', {
            userId: userId,
            postId: postId,
            text: text
        })
            .then(result => {
                dispatch({
                    type: CREATE_COMMENT,
                    payload: result.data[0]
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

}

export const clearAllPosts = () => dispatch => {
    dispatch({
        type: CLEAR_POSTS,
        payload: []
    })
}
