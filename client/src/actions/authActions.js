import { SET_AUTH_USER } from './Types';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../setAuthToken';

export const login = (userLogin) => dispatch => {
   axios.post('http://localhost:8080/login', userLogin)
      .then(result => {
         if (result.data.token) {
            localStorage.setItem('token', result.data.token);
            setAuthToken(result.data.token);
            const decodedToken = jwt.verify(result.data.token.substring(7),'secret');
            dispatch(setCurrentUser(decodedToken));
         }
      })
      .catch(err => {
         console.log(err);
      })
}

export const setCurrentUser = (decodedToken) => {
   return {
      type: SET_AUTH_USER,
      payload: decodedToken
   }
}