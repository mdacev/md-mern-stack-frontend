import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import getNotesAction from '../redux/actions/getNotesAction' 
import filterNotesAction from '../redux/actions/filterNotesAction' 


class FilterNotes extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            notes: [],
            notes_filter: [],
            priorityClass: 'form-control primary',
            title_filter: '',
            priority_filter: 'Priority',
            todo_filter: '',
            inputSerachClass: 'input-title-filter form-control  col-md-12',
            flag:false
        }

        
    }


    selectedPriority = (e) => {

        let priority_value = e.target.value;
        let priority_ix = e.target.selectedIndex;
        
        switch(priority_ix){
            case 1:
                this.setState({ priorityClass: 'form-control bg-danger text-white', priority_filter: priority_value});
            break;
            case 2:
                this.setState({ priorityClass: 'form-control bg-warning', priority_filter: priority_value});
            break;
            case 3:
                this.setState({ priorityClass: 'form-control bg-success text-white', priority_filter: priority_value});
            break;

            default: this.setState({ priorityClass: 'form-control', priority_filter: priority_value});
            
        }
        
        this.filterNotesCall(priority_value, this.state.todo_filter);


    }

    handleToDoChange = (e) =>{

        const tv = e.currentTarget.value;
        this.setState({ todo_filter: tv});
        localStorage.setItem('status' , tv);
        this.filterNotesCall(this.state.priority_filter, tv);
    }

    
    filterNotesCall = (pv, tv) =>{
        
        let filter = { priority_val: pv, status_val: tv, title_filter: this.state.title_filter, filter_notes: this.props.notesListReducer.notes_original }
        this.props.filterNotesAction(filter);
        
    }

    onInputSearchChange = async (e) => {
        
        //init
        this.setState({
            [e.target.name]: e.target.value
        });

        if(String(e.target.value).length > 1 || String(e.target.value).length === 0){
            this.setState({
                [e.target.name]: e.target.value
            })
            localStorage.setItem('title' , e.target.value);
            await this.props.getNotesAction(e.target.value);
            if(this.props.notesListReducer.notes.length > 0)
                this.filterNotesCall(this.state.priority_filter, this.state.todo_filter);
            
            
        }
            
    }

    render() {


        return(

                <div className="row fiter-notes ml-2 mr-2 mt-1">
                
                    <form className="form-inline ml-2 col-md-12">
                        <div className="col-md-6 row">
                            <div className="col-md-12 row">
                                <input className={this.state.inputSerachClass}
                                    type="input" 
                                    placeholder="Search by title (2 characters min)" 
                                    aria-label="Search"
                                    name="title_filter"
                                    onChange={this.onInputSearchChange}
                                    value={this.state.title_filter}
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <select id="sel_pri" 
                                className={this.state.priorityClass} 
                                onChange={this.selectedPriority}>
                                <option>Priority</option>
                                <option id="h" className="input input-lg bg-danger">High</option>
                                <option id="m" className="bg-warning">Medium</option>
                                <option id="l" className="bg-success">Low</option>
                            </select>
                        </div>
                        <div className="col-md-3 pl-2 pr-0">
                            <div className="custom-control custom-radio custom-control-inline">
                                    <input className="custom-control-input" type="radio" value='' id="customRadio1" name="customRadio"
                                            checked={this.state.todo_filter === ''}
                                            onChange={this.handleToDoChange} />
                                    <label className="custom-control-label radio-label-filter" htmlFor="customRadio1">All</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                    <input className="custom-control-input" type="radio" value={false} id="customRadio2" name="customRadio"
                                            checked={this.state.todo_filter === 'false'}
                                            onChange={this.handleToDoChange} />
                                    <label className="custom-control-label radio-label-filter" htmlFor="customRadio2">Pending</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                    <input className="custom-control-input" type="radio" value={true} id="customRadio3" name="customRadio"
                                            checked={this.state.todo_filter === 'true'}
                                            onChange={this.handleToDoChange} />
                                    <label className="custom-control-label radio-label-filter" htmlFor="customRadio3">Made</label>
                            </div>
                        </div>
                    </form>
                </div>
            

        )

    }
}

FilterNotes.propTypes = {

    notes: PropTypes.array
}


const mapStateToProps = (state) => {

    return {
        notesListReducer: state.notesListReducer
    }
}



const mapDispatchToProps = (dispatch) => {

    return {
        filterNotesAction : (filter) => dispatch(filterNotesAction(filter)),
        getNotesAction : (text) => dispatch(getNotesAction(text))
    }
}



export default connect(mapStateToProps , mapDispatchToProps) (FilterNotes);