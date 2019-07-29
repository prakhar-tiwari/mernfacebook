import { SET_PROFILE_IMAGE, SET_TIMELINE_USER, GET_FEED, GET_TIMELINE_FEED } from './Types';
import axios from 'axios';

export const uploadPhoto = (formData,userName) => dispatch => {
    axios.post('/uploadphoto', formData)
        .then(result => {
            const timeLineUser = {
                _id: result.data._id,
                name: result.data.name,
                userName: result.data.userName,
                profileImage: result.data.profileImage,
                authUser: (result.data.userName === userName) ? true : false
            }
            dispatch({
                type: SET_PROFILE_IMAGE,
                payload: result.data
            })
            dispatch({
                type: SET_TIMELINE_USER,
                payload: timeLineUser
            })
        })
        .catch(err => {
            console.log(err);
        })
}

export const setTimeLineUser = (userName, authUserName) => dispatch => {
    axios.get('/getuser/' + userName)
        .then(result => {
            const resultData=result.data[0];
            const timeLineUser = {
                _id: resultData._id,
                name: resultData.name,
                userName: resultData.userName,
                profileImage: resultData.profileImage,
                authUser: (userName === authUserName) ? true : false
            }
            dispatch({
                type: SET_TIMELINE_USER,
                payload: timeLineUser
            });
            const posts=[...resultData.posts];
            const userPosts=posts.map(userPost=>{
                userPost.createdBy=resultData.name;
                userPost.profileImage=resultData.profileImage;
                userPost.userName=resultData.userName;
                return userPost;
            })
            const friendsWithPosts=resultData.friends.filter(friend=>friend.posts.length>0);
            const friendsPosts=friendsWithPosts.map(friendPost=>{
                return friendPost.posts.map(post=>{
                    post.createdBy=friendPost.name;
                    post.profileImage=friendPost.profileImage;
                    post.userName=friendPost.userName;
                    return post;
                })
            }).flat(1);
            const allPosts=[...userPosts,...friendsPosts];
            dispatch({
                type:GET_TIMELINE_FEED,
                payload:allPosts
            })
        })
        .catch(err => {
            console.log(err)
        })
}