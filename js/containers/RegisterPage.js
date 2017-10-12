import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form';
import { sendingRequest, register } from '../actions/UserActions';

class RegisterPage extends Component {
    render() {
        const dispatch = this.props.dispatch;
        const { formState, currentlySending } = this.props.data;
        return (
            <div>
                <div>
                    <div>
                        <h2>Register</h2>
                    </div>
                    <Form data={formState} dispatch={dispatch} location={location} history={this.props.history} onSubmit={::this._register} btnText={"Register"} currentlySending={currentlySending} />
                </div>
            </div>
        );
    }

    _register(username,password) {
        this.props.dispatch(register(username, password));
    }
}

function mapStateToProps(state){
    return{
        data:state.user
    };
}
export default connect(mapStateToProps)(RegisterPage);