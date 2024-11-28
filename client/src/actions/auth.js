import { AUTH } from "../constants/actionTypes";

import * as SERVER from '../api/index';


export const signin = (userDetails, history) => async (dispatch) => {
    try {

        const { data } = await SERVER.signIn(userDetails);

        dispatch({ type: AUTH, data })
        
        history.push('/')
    } catch (error) {
        console.error(error)
    }
}

export const signup = (userDetails, history) => async (dispatch) => {
    try {

        const {  data } = await SERVER.signUp(userDetails);

        dispatch({ type: AUTH, data })
        
        history.push('/')
    } catch (error) {
        console.error(error)
    }
}

