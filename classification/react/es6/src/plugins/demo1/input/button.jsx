"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	// 依赖
	const React = require('react');

	// 
	class View extends React.Component {
		render(){ 
			let me = this,
				props = me.props;
			return (
				<input {...props} />
			);
		}
		static defaultProps = {
			"value": "确 定",
			"className": "fn-btn fn-btn-primary",
			"type": "button"
		}
	};

	return View;

});