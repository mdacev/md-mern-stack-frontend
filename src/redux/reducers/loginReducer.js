import {type as signinActionType} from '../actions/signinAction';
import {type as signupActionType} from '../actions/signupAction';

const initState = {
    username: '',
    password: ''
}

function  loginReducer  (state = initState, {type, payload}) {

    switch(type){

        case signinActionType: 
            return Object.assign({}, state, {response: payload})

        case signupActionType: 
            return Object.assign({}, state, {response: payload})

        default:
            return state;
    }

    
}

export default loginReducer;