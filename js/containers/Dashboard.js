import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem , deleteItem, toggleItem } from  '../actions/TodoActions';
import Items from '../components/Item';
class Dashboard extends Component{
    render() {
        return(
            <article>{
                this.props.data.loggedIn ?
                    <section className="">
                        <header className="header">
                            <h1>TodoList</h1>
                            <input type="text"
                                   className="new-todo"
                                   placeholder="请输入内容..."
                                   defaultValue=""
                                   onKeyDown={::this.downHandle}
                            />
                        </header>
                        {this.props.lists.length ? <Items lists={this.props.lists} delete={::this._delete} toggle={::this._toggle}/>:""}

                    </section>
                    :
                    <div className="error">请先登录</div>
            }</article>
        );
    }
    downHandle(ev){
        if( ev.keyCode === 13 && ev.target.value){
            this.props.dispatch(addItem(ev.target.value));
            ev.target.value="";
        }
    }
    _delete(id) {
        if(id){
            console.log("delete");
            this.props.dispatch(deleteItem(id));
        }
    }
    _toggle(id){
        if(id){
            this.props.dispatch(toggleItem(id));
        }
    }
}
function mapStateToProps(state){
    return{
        data:state.user,
        lists:state.todo
    };
}

export default connect(mapStateToProps)(Dashboard);