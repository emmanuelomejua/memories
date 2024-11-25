import { AUTH } from "../constants/actionTypes";

import * as SERVER from '../api/index';


export const signin = (userDetails, history) => async (dispatch) => {
    try {

        const { data } = await SERVER.siginIn(userDetails);

        dispatch({ type: AUTH, data })
        
        history.push('/')
    } catch (error) {
        console.error(error)
    }
}

export const signup = (userDetails, history) => async (dispatch) => {
    try {

        const {  data } = await SERVER.signup(userDetails);

        dispatch({ type: AUTH, data })
        
        history.push('/')
    } catch (error) {
        console.error(error)
    }
}

