import {GET_FEED,SUBMIT_POST} from './Types';
import axios from 'axios';
;
export const getFeed=(id)=>dispatch=>{
    axios.post('/getfeed', { userId: id })
    .then(result => {
        dispatch({
            type:GET_FEED,
            payload:result.data
        })
    })
    .catch(err => {
        console.log(err)
    })
}

export const submitPost=(newPost)=>dispatch=>{
    axios.post('/submitpost', newPost)
    .then(result => {
        dispatch({
            type:SUBMIT_POST,
            payload:result.data
        })
    })
    .catch(err => {
        console.log(err)
    })
}

export const likePost=(postId,id)=>dispatch=>{
    axios.post('/likepost',{
        postId:postId,
        userId:id
    })
    .then(result=>{
        dispatch(getFeed(id))
    })
    .catch(err=>{
        console.log(err);
    })
}