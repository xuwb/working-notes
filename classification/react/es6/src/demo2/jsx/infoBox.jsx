"use strict";
define(function(require, exports, module) {
    const React = require('react'),
          InfoStore = require('demo2/stores/Controller/info').Store,
          InfoAction = require('demo2/stores/Controller/info').Actions,
          TableAction = require('demo2/stores/Controller/table').Actions,
          Hoc = require('./hoc');
    const Util = require('util');

    class InfoBox extends React.Component {
        constructor(props) {
            super(props);
            // this.clickHandler = this.clickHandler.bind(this);
        }
        // clickHandler = e => {
        //     console.log(this);
        // }
        clickHandler() {
            let data = this.props.data;
            if(!data.id) {
                TableAction.add(this.refs.userName.value);
            } else {
                TableAction.modify(data.id, this.refs.userName.value);
            }
            
            InfoAction.reset();
        }
        changeInput = e => {
            // 对value绑定过数据后，必须使用onChange方法才能输入修改数据
            InfoAction.changeInput(e.target.value);
        }
        render() {
            return (
                <tfoot>
                    <tr>
                        <td><input ref="userName" id='inputName' type="text" value={this.props.data.name} onChange={this.changeInput} /></td>
                        <td><button className="JS_addBtn btn btn-default" onClick={this.clickHandler.bind(this)}>{this.props.data.btnType}</button></td>
                    </tr>
                </tfoot>
            )
        }
    }
    return Hoc(InfoBox, InfoStore);
});