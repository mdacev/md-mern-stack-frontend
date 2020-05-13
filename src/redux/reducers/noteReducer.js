import {type as findNoteByEditActionType} from '../actions/findNoteByEditAction'
import {type as saveNoteActionType} from '../actions/saveNoteAction'
import {type as madeNoteActionType} from '../actions/madeNoteAction'
import {type as deleteNoteActionType} from '../actions/deleteNoteAction'

const initState = {};

function  noteReducer  (state = initState, {type, payload}) {

    switch(type){

        case findNoteByEditActionType: 
            return Object.assign({}, state, {note: payload})

        case saveNoteActionType: 
            return Object.assign({}, state, {res: payload})

        case madeNoteActionType: 
            return Object.assign({}, state, {res: payload})

        case deleteNoteActionType: 
            return Object.assign({}, state, {res: payload})

        default:
            return state;
    }
    
}

export default noteReducer;