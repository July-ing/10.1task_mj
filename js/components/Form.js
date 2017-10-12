import React, { Component } from 'react';
import { changeForm } from  '../actions/UserActions';
import LoadingButton from './LoadingButton';
import ErrorMessage from './ErrorMessage';

// Object.assign 有兼容问题，fallback a polyfill
const assign = Object.assign || require('object.assign');

class Form extends Component {
    render() {
        return (
            <form className="form" onSubmit={::this._onSubmit}>
                <ErrorMessage/>
                <div className="form__field-wrapper cl">
                    <label className="form__field-input" htmlFor="username">Username</label>
                    <input className="form__field-label" type="text" id="username" value={this.props.data.username} placeholder="your username..." onChange={::this._changeUsername} autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                </div>
                <div className="form__field-wrapper cl">
                    <label className="form__field-input" htmlFor="password">Password</label>
                    <input className="form__field-label" type="password" id="password" value={this.props.data.password} placeholder="••••••" onChange={::this._changePassword} />
                </div>
                <div className="form__submit-btn-wrapper">
                    {this.props.currentlySending ? (
                        <LoadingButton />
                    ) : (
                        <button className="form__submit-btn" type="submit">{this.props.btnText}</button>
                    )}
                </div>
            </form>
        );
    }

    _changeUsername(evt) {
        var newState = this._mergeWithCurrentState({
            username: evt.target.value
        });

        this._emitChange(newState);
    }

    _changePassword(evt) {
        var newState = this._mergeWithCurrentState({
            password: evt.target.value
        });

        this._emitChange(newState);
    }

    _mergeWithCurrentState(change) {
        return assign(this.props.data, change);
    }

    _emitChange(newState){
        this.props.dispatch(changeForm(newState));
    }

    _onSubmit(evt) {
        evt.preventDefault();
        this.props.onSubmit(this.props.data.username, this.props.data.password);
    }
}

Form.proTypes = {
    onSubmit : React.PropTypes.func.isRequired,
    btnText: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired
}

export default Form;