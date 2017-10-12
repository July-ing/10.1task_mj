import React, { Component } from 'react';
import { Link } from 'react-router';
import { logout } from '../actions/UserActions';
import LoadingButton from './LoadingButton';

class Nav extends Component {
    render(){
        var username = localStorage.getItem('username');
        const navButtons = this.props.loggedIn ? (
            <div>
                <Link to='/dashboard' className="btn" >{username}</Link>
                {this.props.currentlySending ? (
                    <a href="#" className="btn btn-false" onClick={function(){return false;}} >Logout</a>
                ) : (
                    <a href="#" className="btn" onClick={::this._logout}>Logout</a>
                )}
            </div>
        ) : (
            <div>
                <Link to="/register" className="btn">Register</Link>
                <Link to="/login" className="btn">Login</Link>
            </div>
        );

        return (
            <div className="">
                <div className="nav">
                    <div className="deco"></div>
                    <Link to="/" className=""><h1 className="">Task</h1></Link>
                    { navButtons }
                </div>
            </div>
        )
    }

    _logout(){
        this.props.dispatch(logout());
    }
}

Nav.propTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
    currentlySending: React.PropTypes.bool.isRequired
}

export default Nav;