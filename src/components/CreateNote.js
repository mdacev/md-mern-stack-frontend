import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import configfront from '../helpers/configfront.json'
import {connect} from 'react-redux'
import ModalMsg from './ModalMsg'
import { ModalManager} from 'react-dynamic-modal';
import findNoteByEditAction from '../redux/actions/findNoteByEditAction' 
import saveNoteAction from '../redux/actions/saveNoteAction' 

 class CreateNote extends Component {

    state = {
        title: '',
        titleError: '',
        inputClass: 'form-control',
        divClass: 'form-group',
        content: '',
        date: new Date(),
        userCreator: '',
        userAssigned: '',
        made: false,
        selectedPriority: 'High',
        usersByAssign: [],
        editing: false,
        _id: ''
    }

    //Mount
    async componentDidMount() {
        const server_host = process.env.REACT_APP_API+configfront.EOP_USERS
        const res = await axios.get(server_host);
        this.setState({selectedPriority: 'High'});
        if (res.data.length > 0) {
            this.setState({
                usersByAssign: res.data.map(user => user),
                userAssigned: res.data[0]
            })
        }
        //Edit
        if (this.props.match.params.id) {
            
            //const res = await axios.get(configfront.EOP_NOTES + '/' + this.props.match.params.id);

            await this.props.findNoteByEditAction(this.props.match.params.id);
            const {noteReducer} = this.props;
            const note_edit = noteReducer.note;
            
            this.setState({
                title: note_edit.title,
                content: note_edit.content,
                userCreator: note_edit.userCreator,
                userAssigned: note_edit.userAssigned,
                made: note_edit.made,
                priority: note_edit.priority,
                date: new Date(note_edit.date),
                selectedPriority: note_edit.priority,
                _id: note_edit._id,
                editing: true
            });

            this.handlePriorityChange(this.state.selectedPriority);
        }
    }

    validate = () => {
        let hasError = false;
        if(this.state.title.trim() === ''){
            this.setState({ titleError: 'The title is required.', 
                            inputClass: 'form-control is-invalid',
                            divClass: 'form-group has-danger'});
                            hasError = true;
        }
        else{
            this.setState({ titleError: '', 
            inputClass: 'form-control',
            divClass: 'form-group'});
            hasError = false;
        }
        return hasError;
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const err = this.validate();
        if(!err){
            const note = {
                title: this.state.title,
                content: this.state.content,
                userCreator: localStorage.getItem('userid'),
                userAssigned: this.state.userAssigned,
                priority: this.state.selectedPriority,
                made: this.state.made,
                date: this.state.date
            };
            
            await this.props.saveNoteAction(this.state._id, note);
            const {noteReducer} = this.props;
            const {msg , title, path} = noteReducer.res;
            this.setMessage(msg+'\n'+title, path);
        }

    }

    setMessage = (message, path) => {
        ModalManager.open(<ModalMsg text={message} onRequestClose={() => true} cn="modal-msg modal-msg-ok"/>);
        this.props.history.push(path);
    }

    onCancel = (e) => {
        e.preventDefault();
        this.props.history.push('/notes');
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        if(e.target.name === 'title')
            this.validate();
    }

    onSelectChange = (e) => {
        this.setState({
            userAssigned: e.target.value
        })
        
    }

    onChangeDate = date => {
        this.setState({ date });
    }

    handlePriorityChange = (ce) =>{

        let val = ce;
        if(ce.target !== undefined)
            val = ce.target.value;

        this.setState({
          selectedPriority: val
        });
    }
    
    cleanForm = () => {
        this.setState({
            title: '',
            titleError: '',
            inputClass: 'form-control',
            divClass: 'form-group',
            content: '',
            date: new Date(),
            userCreator: '',
            userAssigned: '',
            made: false,
            selectedPriority: 'High',
            usersByAssign: [],
            editing: false,
            _id: ''
        });
    }

    render() {
        
        return (
            <div className="col-md-6 offset-md-3 mt-3 ">
                <div className="card card-body bg-light form-modal">
                    
                    <h4>
                        <i className="material-icons mb-1 mr-2">assignment</i>
                        {!this.state.editing ? 'Create a Note' : 'Edit a Note'}
                    </h4>
                    
                    <form onSubmit={this.onSubmit}>
                        {/* SELECT THE USER */}
                        <div className="form-group">
                            <label htmlFor="userAssigned" className="label-form">User assigned:</label>
                            <select
                                className="form-control"
                                value={this.state.userAssigned}
                                onChange={this.onSelectChange}
                                name="userAssigned"
                                id="userAssigned"
                                required>
                                {
                                    
                                    this.state.usersByAssign.map(user => (
                                        <option key={user._id} value={user._id}>
                                            {user.username}
                                        </option>
                                    ))
                                    
                                }
                            </select>
                        </div>
                        {/* Note Title */}
                        <div className={this.state.divClass}>
                            <input
                                type="text"
                                className={this.state.inputClass}
                                placeholder="Title"
                                onChange={this.onInputChange}
                                name="title"
                                value={this.state.title}
                                />
                            {this.state.titleError !== '' ? <div className="invalid-feedback">{this.state.titleError}</div> : null}
                        </div>
                        

                        {/* Note Content */}
                        <div className="form-group">
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Content"
                                name="content"
                                onChange={this.onInputChange}
                                value={this.state.content}
                                >
                            </textarea>
                        </div>

                        {/* Priority */}
                        <div className="col-md-12 row">
                            <div className="col-md-6 mt-2">
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input className="custom-control-input" type="radio" value="High" id="customRadio1" name="customRadio"
                                            checked={this.state.selectedPriority === 'High'}
                                            onChange={this.handlePriorityChange} />
                                    <label className="custom-control-label" htmlFor="customRadio1">High</label>
                                </div>
                                
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input className="custom-control-input" type="radio" value="Medium" id="customRadio2" name="customRadio"
                                            checked={this.state.selectedPriority === 'Medium'}
                                            onChange={this.handlePriorityChange} />
                                    <label className="custom-control-label" htmlFor="customRadio2">Medium</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input className="custom-control-input" type="radio" value="Low" id="customRadio3" name="customRadio"
                                        checked={this.state.selectedPriority === 'Low'}
                                        onChange={this.handlePriorityChange} />
                                    <label className="custom-control-label" htmlFor="customRadio3">Low</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                {/* Note Date */}
                                <div className="custom-control custom-radio custom-control-inline mb-3">
                                    <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate} />
                                </div>
                            </div>
                        </div>

                        <div style={{textAlign: 'center', borderTop: 'darkgray solid 1px'}} className="pt-3">
                            <button type="submit" className="btn btn-outline-success mr-2">
                                <i className="material-icons mr-1">assignment</i>Save
                            </button>
                            <button type="button" className="btn btn-outline-danger" onClick={this.onCancel}>
                                <i className="material-icons mr-1">speaker_notes_off</i>Cancel
                            </button>
                        </div>
                       
                    </form>

                </div>

            </div>

            
        )
    }
}


const mapStateToProps = (state) => {

    return {
        noteReducer: state.noteReducer
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        findNoteByEditAction : (id) => dispatch(findNoteByEditAction(id)),
        saveNoteAction : (id , note) => dispatch(saveNoteAction(id , note))
    }
}

export default connect(mapStateToProps , mapDispatchToProps) (CreateNote)