import React, { Component } from 'react';
import { getUserProfile } from './util/APIUtils';
import LoadingIndicator  from './common/LoadingIndicator';
import NotFound from './common/NotFound';
import ServerError from './common/ServerError';
import CheckAuthentication from './common/CheckAuthentication';

class LoginHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoading: false
        }
    }

     loadUserProfile=(username) => {        
        const _this=this;
        if(this.props.username !== null){ 
        _this.setState({
            isLoading: true
        });

        getUserProfile(username)
        .then(response => {
            _this.setState({
                user: response,
                isLoading: false
            });
        }).catch(error => {
            if(error.status === 404) {
                _this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                _this.setState({
                    serverError: true,
                    isLoading: false
                });        
            }
        });    
    }    
    }
      
    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadUserProfile(username);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadUserProfile(nextProps.match.params.username);
        }        
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }
        if(!this.props.isAuthenticated) {
            return <CheckAuthentication {...this.props}/>
        }

        return (
            <div className="App-content">
                { 
                    this.state.user ? (
                        <div>
                            login access home                             
                        </div>  
                    ): null               
                }
            </div>
        );
    }
}

export default LoginHome;