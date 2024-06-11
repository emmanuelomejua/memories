import { AUTH } from "../constants/actionTypes";

import * as api from '../api/index';


export const signin = (userDetails, history) => async (dispatch) => {
    try {
        
        history.push('/')
    } catch (error) {
        console.error(error)
    }
}

export const signup = (userDetails, history) => async (dispatch) => {
    try {
        
        history.push('/')
    } catch (error) {
        console.error(error)
    }
}

