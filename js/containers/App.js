import  React, {Component} from 'react';
import Nav from '../components/Nav';
import { connect } from 'react-redux';
import auth from '../utils/auth';

class App extends Component {
    render() {
        return(
            <div className="wrapper">
                <Nav loggedIn={this.props.data.loggedIn} history={this.props.history} location={this.props.location} dispatch={this.props.dispatch} currentlySending={this.props.data.currentlySending}></Nav>
                <div className="content">
                    <div className="deco"></div>
                    { this.props.children }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        data:state.user
    };
}
export default connect(mapStateToProps)(App);