import { SET_AUTH_USER, GET_ERRORS } from './Types';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthToken from '../setAuthToken';

export const login = (userLogin, props) => dispatch => {
   axios.post('login', userLogin)
      .then(result => {
         if (result.data.token) {
            localStorage.setItem('token', result.data.token);
            setAuthToken(result.data.token);
            const decodedToken = jwt.verify(result.data.token.substring(7), 'secret');
            dispatch(setCurrentUser(decodedToken));
         }
      })
      .catch(err => {
         let errors = {}
         if (Array.isArray(err.response.data)) {
            err.response.data.map(er => {
               if (er.nestedErrors) {
                  errors[er.nestedErrors[0].param] = er.msg;
               }
               else {
                  errors[er.param] = er.msg;
               }
            })
         }
         else {
            errors = err.response.data;
         }
         dispatch({
            type: GET_ERRORS,
            payload: errors
         })
      })
}

export const setCurrentUser = (decodedToken) => {
   return {
      type: SET_AUTH_USER,
      payload: decodedToken
   }
}

export const logout = () => dispatch => {
   localStorage.removeItem('token');
   setAuthToken(false);
   dispatch(setCurrentUser({}));
}