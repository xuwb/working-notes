'use strict';

// 修改删除按钮
define(function(require, exports, module) {

    var React = require('react');
    var ConnectAction = require('actions/connect_actions');

    var CrudBtn = React.createClass({
        getInitialState: function(){
            return {}
        },
        clickHandler: function(e){
            e.preventDefault();
            e.stopPropagation();
            
            switch(this.props.btnName){
                case '添加':
                    this.props.callbackParent();
                    // ConnectAction.add();
                    break;
                case '修改':
                    this.props.callbackParent('modify', this.props.data);
                    break;
                case '删除':
                    // if(confirm("是否删除" + this.props.data.title + "？")){
                    //     this.props.callbackParent('delete', this.props.data);
                    // }
                    this.props.callbackParent('delete', this.props.data);
                    break;
                default:
                    this.props.callbackParent(e);
                    break;
            }
        },
        render: function(){
            return(
                <a href={"#"} className={this.props.className} onClick={this.clickHandler}>{this.props.btnName}</a>
            )
        }
    });
    return CrudBtn;
})