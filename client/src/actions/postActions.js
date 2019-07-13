import {GET_FEED,SUBMIT_POST} from './Types';
import axios from 'axios';
;
export const getFeed=(id)=>dispatch=>{
    axios.post('http://localhost:8080/getfeed', { userId: id })
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
    axios.post('http://localhost:8080/submitpost', newPost)
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
    axios.post('http://localhost:8080/likepost',{
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