import {type as getNotesActionType} from '../actions/getNotesAction'
import {type as filterNotesActionType} from '../actions/filterNotesAction'

const initState = {
    notes: []
}

 function  notesListReducer  (state = initState, {type, payload}) {

    switch(type){

        case getNotesActionType: 
            return Object.assign({}, state, {notes: payload, notes_original:payload})

        case filterNotesActionType: 
            return Object.assign({}, state, {notes: payload})

        default:
            return state;
    }

}

 

export default notesListReducer;