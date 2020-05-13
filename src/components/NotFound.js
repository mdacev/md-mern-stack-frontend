import React from 'react'
import { Component } from "react"
import { Link } from 'react-router-dom'

class  NotFound extends Component {


    render(){
        return(
            <div className="not-found col-md-12">
                <h1>404!</h1>
                <h2>page not found...</h2>
                <Link to={"/notes"} className="btn btn-danger">Back</Link>
            </div>
        );
    }
    
}

export default NotFound;