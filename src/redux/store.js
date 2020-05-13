import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import loginReducer from './reducers/loginReducer';
import notesListReducer from './reducers/notesListReducer';
import noteReducer from './reducers/noteReducer';

const storeReducer = combineReducers({
    
    loginReducer,
    notesListReducer,
    noteReducer
});

const store  = createStore (storeReducer, applyMiddleware(thunk));

export  default store;
