import { SET_PROFILE_IMAGE, SET_TIMELINE_USER, GET_FEED, GET_FRIENDS, GET_TIMELINE_FEED } from './Types';
import axios from 'axios';

export const uploadPhoto = (formData, userName) => dispatch => {
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
            const resultData = result.data[0];
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
            const posts = [...resultData.posts];
            const userPosts = posts.map(userPost => {
                userPost.createdBy = {
                    _id: resultData._id,
                    name: resultData.name,
                    profileImage: resultData.profileImage,
                    userName: resultData.userName
                };
                return userPost;
            })
            const friendsWithPosts = resultData.friends.filter(friend => friend.posts.length > 0);
            const friendsPosts = friendsWithPosts.map(friendPost => {
                return friendPost.posts.map(post => {
                    post.createdBy = {
                        _id: friendPost.user._id,
                        name: friendPost.user.name,
                        profileImage: friendPost.user.profileImage,
                        userName: friendPost.user.userName
                    };
                    return post;
                })
            }).flat(1);
            const allPosts = [...userPosts, ...friendsPosts];
            dispatch({
                type: GET_FEED,
                payload: {
                    data: allPosts,
                    hasMorePosts: (result.data.length) ? true : false
                }
            });

            var friends = resultData.friends.map(friend => {
                if (friend.user)
                    return {
                        _id: friend.user._id,
                        name: friend.user.name,
                        userName: friend.user.userName,
                        profileImage: friend.user.profileImage,
                        status: friend.status
                    }
            });
            friends = (friends[0]) ? friends : [];

            dispatch({
                type: GET_FRIENDS,
                payload: friends
            })
        })
        .catch(err => {
            console.log(err)
        })
}