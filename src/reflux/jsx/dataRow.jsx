'use strict';

define(function(require, exports, module) {

    var util    = require('../common/util'),
        React   = require('react'),
        CrudBtn = require('./crudBtn');
    
    // 表格行
    var DataRow = React.createClass({
        onBtnClick: function(type, value) {
            this.props.callbackParent(type, value);
        },
        render: function(){
            var value = this.props.data;
            // console.log(value);
            return (
                <tr data-id={value.id}>
                    <td>{value.title}</td>
                      <td>{value.author}</td>
                      <td>{util.formatDateTime(value.pubtime)}</td>
                      <td>
                          <CrudBtn btnName="修改" className="lnk btn-table" data={value} callbackParent={this.onBtnClick} />
                          &nbsp;
                          <CrudBtn btnName="删除" className="lnk btn-table" data={value} callbackParent={this.onBtnClick} />
                      </td>
                </tr>
            )
        }
    });
    return DataRow;
})
