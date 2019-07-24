import {SET_PROFILE_IMAGE} from './Types';
import axios from 'axios';

export const uploadPhoto=(formData)=>dispatch=>{
    axios.post('/uploadphoto',formData)
        .then(result=>{
            dispatch({
                type:SET_PROFILE_IMAGE,
                payload:result.data
            })
        })
        .catch(err=>{
            console.log(err);
        })
}