import {SET_TAGGED_FRIENDS} from './Types';

export const tagFriends=(selectedItems)=>dispatch=>{
    dispatch({
        type:SET_TAGGED_FRIENDS,
        payload:selectedItems
    })
}