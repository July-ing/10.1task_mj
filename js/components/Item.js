import React from 'react';

export default class Items extends React.Component{
    render(){
        function   formatDate(now)   {
            var   year=now.getYear()-100;
            var   month=now.getMonth()+1;
            var   date=now.getDate();
            var   hour=now.getHours();
            var   minute=now.getMinutes();
            var   second=now.getSeconds();
            return   year+"-"+month+"-"+ date+"   "+hour+":"+minute+":"+second;
        }

        const that = this;
        console.log(this.props.lists);
        const list = this.props.lists.map((item,index) => {
            const time = formatDate(new Date(item.id));
            const style = item.completed ? {
                backgroundImage: "url('../../img/check-box.png')"
            }:{
                backgroundImage: "url('../../img/check-box-empty.png')"
            };
            const bgc = !item.completed ? {
                backgroundColor: "rgb(229,187,129)"
            } : {
                backgroundColor: "rgb(222,125,44)"
            }
            return<li key={index}>
                <div className="border" style={bgc}>
                    <label className="checkbox-inline completed" >
                        <i className="icon-checkbox" style={style}></i>
                        <input type="checkbox" onClick={this._toggle.bind(that,item.id)}></input>
                    </label>
                    <p>{item.text}</p>
                    <span>{time}</span>
                    <div className="close" onClick={this._delete.bind(this,item.id)}>×</div>
                </div>
            </li>
        })
        console.log(list);
        return(
            <ul className="container">{list}</ul>
        )
    }
    _toggle(id,event){
        console.log(id);
        console.log(event);
        this.props.toggle(id);
    }
    _delete(id,event){
        console.log(id);
        this.props.delete(id);
    }
}