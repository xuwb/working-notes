"use strict";

define(function(require, exports, module) {

    const React = require('react'),
          Reflux = require('reflux'),
          TableController = require('demo2/stores/Controller/table'),
          InfoAction = require('demo2/stores/Controller/info').Actions,
          TableStore = TableController.Store,
          TableAction = TableController.Actions,
          Hoc = require('./hoc'),
          InfoBox = require('./infoBox');

    class DataTable extends React.Component {
        constructor(props) {
            super(props);
        }
        modifyClick(e) {
            let id = e.target.getAttribute('data-id');
            let item = null;
            $.each(this.props.data, (i, val) => {
                if(val.id == id) {
                    item = val;
                    return false;
                }
            });
            InfoAction.itemModify(item, this.refs.infoBox);
        }
        deleteClick = e => {
            let id = e.target.getAttribute('data-id');
            TableAction.delete(id);
        }
        render() {
            // 普通元素 button 不能通过属性传递 object 对象
            let list = this.props.data.map((val, index) => {
                return (
                    <tr key={val.id}>
                        <td>{val.name}</td>
                        <td>
                            <button ref="btn_modify" className='JS_modBtn btn btn-info' data-id={val.id} onClick={this.modifyClick.bind(this)}>修改</button>
                            <button ref="btn_delete" className='JS_delBtn btn btn-primary' data-id={val.id} onClick={this.deleteClick}>删除</button>
                        </td>
                    </tr>
                )
            });
            return (
                <table>
                    <thead>
                        <tr>
                            <th width="150">姓名</th>
                            <th width="120">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                    <InfoBox ref="infoBox" />
                </table>
            )
        }
    }
    return Hoc(DataTable, TableStore);
});