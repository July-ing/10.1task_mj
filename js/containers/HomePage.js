import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class HomePage extends Component {
    render(){
        //const dispatch = this.props.dispatch;
        const { loggedIn } = this.props.data;

        return (
            <article>
                <section className="">
                    {loggedIn ? (
                        <h1>you are logged in!</h1>
                    ):(
                        <h1>Please log in!</h1>
                    )}
                    <p>------------------------</p>
                    {loggedIn ? (
                        <Link to="/dashboard" className="btn2">Dashboard</Link>
                    ) : (
                        <div>
                            <Link to="/login" className="btn2" >Login</Link>
                            <Link to="/register" className="btn2" >register</Link>
                        </div>
                    )}
                </section>
                <section>
                    <p>@July_ing</p>
                </section>
            </article>
        );
    }
}

function mapStateToProps(state){
    return{
        data:state.user
    };
}

export default connect(mapStateToProps)(HomePage);