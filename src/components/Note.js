import React from 'react'
import { Component } from "react"
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ModalMsg from './ModalMsg'
import { ModalManager} from 'react-dynamic-modal';

import madeNoteAction from '../redux/actions/madeNoteAction' 
import deleteNoteAction from '../redux/actions/deleteNoteAction'
import getNotesAction from '../redux/actions/getNotesAction'

class Note extends Component{

    constructor(props){
        super(props);

        this.state = {
            priorityClass: 'form-control',
            priority_filter: 'Priority',
            todo_filter: '',
            note: {},
            made_id: -1
        }

    }

    
    deleteNote = async (_id) => {
        await this.props.deleteNoteAction(_id); 
        this.refreshView();
    }

    madeNote = async (_id) => {
        await this.props.madeNoteAction(_id); 
        this.refreshView();
    }

    refreshView = async () => {
        const msg = this.props.noteReducer.res.msg;
        await this.props.getNotesAction(this.props.filter);
        this.setMessage(msg);
    }

    setMessage = (message) => {
        ModalManager.open(<ModalMsg text={message} onRequestClose={() => true}  cn="modal-msg modal-msg-ok"/>); 
    }
    

    getClassNamePriority = (p) =>{

        let c = 'badge badge-danger'
        switch(p){
            case 'High':
                c = 'badge badge-danger';
            break;
            case 'Medium':
                c = 'badge badge-warning';
            break;
            case 'Low':
                c = 'badge badge-success';
            break;

            default:
                c = 'badge badge-danger';
        }
        return c;
    }


    render() {

        let note = Object.assign({}, this.props);

        
        return(
            
                <div className={!note.made ? 'card' : 'card made-note '}>
                    <div className="card-header d-flex justify-content-between" >
                        <img src={note.avatarAssigned} className="img-fluid avatar-note" alt="avatar"></img>
                        <h5>{note.title}</h5>
                        <Link to={"/edit/" + note._id} className="btn btn-outline-info btn-sm" hidden={note.made}>
                            <i className="material-icons">
                                border_color</i>
                        </Link>
                    </div>
                    <div className="card-body">

                        <div className="ml-3">
                            <p>
                                <b>Created:</b> {note.usernameCreator}
                            </p>
                            <p>
                                <b>By:</b> {note.usernameAssigned}
                            </p>
                            <p>
                                <b>Content:</b> {note.content}
                            </p>
                            <p>
                                <b>Priority:</b> <span className={this.getClassNamePriority(note.priority)}>{note.priority}</span>
                            </p>
                            
                            <p>
                                <b>Created:</b> {format(note.createdAt)}
                            </p>
                        </div>

                    </div>
                    <div className="card-footer d-flex justify-content-between">
                        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => this.deleteNote(note._id)}
                            data-toggle="tooltip" data-placement="right" title="" data-original-title="Tooltip on right">
                            <i className="material-icons">delete_forever</i>
                           
                        </button>
                        {!note.made ?
                        <button className="btn btn-outline-success btn-sm" onClick={() => this.madeNote(note._id)}>
                            <i className="material-icons">done_outline</i>
                        </button>
                        : <p className="login-text-success mb-0 mt-2">Made</p>
                        }
                    </div>
                </div>
                        
        )
    }

}

Note.propTypes = {

    note: PropTypes.object
}


const mapStateToProps = (state) => {

    return {
        noteReducer: state.noteReducer
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        madeNoteAction : (id) => dispatch(madeNoteAction(id)),
        deleteNoteAction : (id) => dispatch(deleteNoteAction(id)),
        getNotesAction : (text) => dispatch(getNotesAction(text))
    }
}

export default connect(mapStateToProps , mapDispatchToProps) (Note)