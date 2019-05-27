import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstants";
import { asyncActionFinish } from "../async/asyncActions";
import { ASYNC_ACTION_START } from "../async/asyncConstants";
import firebase from '../../app/config/firebase';

export const incrementCounter = () => {
    return {
        type: INCREMENT_COUNTER
    }
}

export const decrementCounter = () => {
    return {
        type: DECREMENT_COUNTER
    }
}

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export const incrementAsync = (name) => {
    return async dispatch => {
        dispatch({type: ASYNC_ACTION_START, payload: name})
        await delay(1000)
        dispatch(incrementCounter())
        dispatch(asyncActionFinish())
    }
}

export const decrementAsync = (name) => {
    return async dispatch => {
        dispatch({type: ASYNC_ACTION_START, payload: name})
        await delay(1000)
        dispatch({type: DECREMENT_COUNTER})
        dispatch(asyncActionFinish())
    }
}

export const testPermission = () => 
    async (dispatch) => {
        const firestore = firebase.firestore();
        try {
            let userDocRef = await firestore.collection('users').doc('qjItQOTgG2Sx7xW9nL1gFmdcP2q1');
            userDocRef.update({
                displayName: 'testing'
            })
        } catch (err) {
            console.log(err)
        }
    }