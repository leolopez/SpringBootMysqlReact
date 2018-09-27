import React, { Component } from 'react';
import {    
  Redirect
} from "react-router-dom";

class CheckAuthentication extends Component {
  
    render() {
        return (
          this.props.username === null | this.props.currentUser === null && this.props.isAuthenticated === false ? <Redirect
          to={{
            pathname: '/login',
            state: { from: this.props.location }
          }}
        />:  null  
        );
    }
}

export default CheckAuthentication;
