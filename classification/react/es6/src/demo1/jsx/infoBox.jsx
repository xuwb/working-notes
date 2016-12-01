"use strict";
define(function(require, exports, module) {
    var React = require('react'),
        Action = require('demo1/actions/tableAction');

    class InfoBox extends React.Component {
        constructor(props) {
            super(props);
            // this.clickHandler = this.clickHandler.bind(this);
        }
        // clickHandler = e => {
        //     console.log(this);
        // }
        clickHandler() {
            Action.add({id: 22, name: 'tip'});
        }
        render() {
            return (
                <tfoot>
                    <tr>
                        <td><input id='inputName' type="text" /></td>
                        <td><button className="JS_addBtn btn btn-default" onClick={this.clickHandler.bind(this)}>添加</button></td>
                    </tr>
                </tfoot>
            )
        }
    }
    return InfoBox;
});