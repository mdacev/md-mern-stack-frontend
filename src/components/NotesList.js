import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Note from './Note'
import FilterNotes from './FilterNotes'
import ModalMsg from './ModalMsg'
import { ModalManager} from 'react-dynamic-modal';
import getNotesAction from '../redux/actions/getNotesAction' 


class NotesList extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            notes_filter: [],
            title_filter: ''
        }
    }
    
    

    async componentDidMount() {
    
        await this.props.getNotesAction(this.state.title_filter);
        if(this.props.notesListReducer.notes.auth !== undefined && this.props.notesListReducer.notes.auth === false){
            ModalManager.open(<ModalMsg text={this.props.notesListReducer.notes.message} onRequestClose={() => true} cn="modal-msg modal-msg-error"/>);
            this.props.history.push('/');
            //alert('Access denied!');
            return;
        }
        this.setState({notes_filter: this.props.notesListReducer.notes_original}); 
       
    }

    
    render() {
        

        let {notesListReducer} = this.props; 
        
        return (

            <div className="col-md-12">

                {/*FilterNotes.js*/}
                <FilterNotes/>

                <div className="row mr-1 ml-1">

                    {
                         notesListReducer.notes.length > 0 ?
                            notesListReducer.notes.map(note => (
                                
                                <div className="col-md-4 p-2 " key={note._id}>
                                    {/*Note.js*/}
                                    <Note   
                                        _id={note._id}
                                        title={note.title}
                                        made={note.made}
                                        usernameCreator={note.userCreator.username}
                                        usernameAssigned={note.userAssigned.username}
                                        idCreator={note.userCreator._id}
                                        idAssigned={note.userAssigned._id}
                                        avatarAssigned={note.userAssigned.image_url}
                                        content={note.content}
                                        priority={note.priority}
                                        createdAt={note.createdAt}
                                        filter={this.state.title_filter}
                                    />
                                </div>
                                
                            ))
                        :<div className="col-md-12 info-notes">There are no notes to show.</div>
                    }
                </div>
            </div>
        )
    }
}


NotesList.propTypes = {

    notes: PropTypes.array
}


const mapStateToProps = (state) => {

    return {
        notesListReducer: state.notesListReducer
    }
}



const mapDispatchToProps = (dispatch) => {

    return {
        getNotesAction : (text) => dispatch(getNotesAction(text))
    }
}



export default connect(mapStateToProps , mapDispatchToProps) (NotesList);
