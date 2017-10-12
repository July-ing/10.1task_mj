import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form';
import auth from '../utils/auth';
import { login } from '../actions/UserActions';

class LoginPage extends Component {
    render() {
        const dispatch = this.props.dispatch;
        const { formState, currentlySending} = this.props.data;
        return (
            <div>
                <div>
                    <div>
                        <h2>Login</h2>
                    </div>
                    <Form data={formState} dispatch={dispatch} location={location} history={this.props.history} onSubmit={::this._login} btnText={"Login"} currentlySending={currentlySending} />
                </div>
            </div>
        );
    }

    _login(username, password){
        this.props.dispatch(login(username, password));
    }
}

function mapStateToProps(state){
    return{
        data:state.user
    };
}
export default connect(mapStateToProps)(LoginPage);