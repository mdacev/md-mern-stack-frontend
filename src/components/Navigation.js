import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {connect} from 'react-redux'

import signinAction from '../redux/actions/signinAction'


 class Navigation extends Component {


    componentDidMount(){
        this.setState(
            {username : localStorage.getItem('username'),
             avatar: localStorage.getItem('avatar')
            });
    }

    state = {
        username: localStorage.getItem('username'),
        avatar: localStorage.getItem('avatar')
    }
    

    logOut = () => {
        this.setState({ username: '' , avatar:''});
    }

    

    
    render() {


        return  (

            
            <nav className="navbar navbar-expand-md navbar-dark bg-primary p-2">
            
                <div className="col-md-12 row">

                    <div className="col-md-8 pt-2">
                        <Link to="/notes" className="navbar-brand">
                            <i className="material-icons">
                                assignment </i> MERN (Stack)
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>

                    <div className="col-md-4 row">
                        
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav ml-5" style={{alignItems: 'baseline'}}>

                                    <li className="nav-item">
                                        <NavLink to="/create" className="nav-link">
                                            <i className="material-icons">
                                                add_box </i>Create Note
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/" className="nav-link" onClick={this.logOut}>
                                        <img src={this.state.avatar} className="img-fluid avatar" alt="avatar"/>
                                           {/* <i className="material-icons">
                                                exit_to_app </i>
                                            */}
                                                Log out {this.state.username}
                                        </NavLink>
                                    </li>
                                    
                                </ul>
                            </div>
                        
                    </div>
                </div>
                
            </nav>
            
        )
    }
}


const mapStateToProps = (state) => {

    return {
        loginReducer: state.loginReducer
    }
}



const mapDispatchToProps = (dispatch) => {

    return {
        signinAction : (user) => dispatch(signinAction(user))
    }
}

export default connect(mapStateToProps , mapDispatchToProps) (Navigation)