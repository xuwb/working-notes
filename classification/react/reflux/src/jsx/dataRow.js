'use strict';

define(function (require, exports, module) {

	var util = require('../common/util'),
	    React = require('react'),
	    CrudBtn = require('./crudBtn');

	// 表格行
	var DataRow = React.createClass({
		displayName: 'DataRow',

		onBtnClick: function onBtnClick(type, value) {
			this.props.callbackParent(type, value);
		},
		render: function render() {
			var value = this.props.data;
			// console.log(value);
			return React.createElement(
				'tr',
				{ 'data-id': value.id },
				React.createElement(
					'td',
					null,
					value.title
				),
				React.createElement(
					'td',
					null,
					value.author
				),
				React.createElement(
					'td',
					null,
					util.formatDateTime(value.pubtime)
				),
				React.createElement(
					'td',
					null,
					React.createElement(CrudBtn, { btnName: '修改', className: 'lnk btn-table', data: value, callbackParent: this.onBtnClick }),
					' ',
					React.createElement(CrudBtn, { btnName: '删除', className: 'lnk btn-table', data: value, callbackParent: this.onBtnClick })
				)
			);
		}
	});
	return DataRow;
});