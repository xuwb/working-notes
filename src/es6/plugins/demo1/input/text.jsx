"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	// 依赖
	const React = require('react');
	const limit = require('common/limit2.0');

	// 
	class View extends React.Component {
		clearAttr(){
			let me = this,
				props = me.props;
			return limit.compose( (props) => {
				limit.each(props.__specalAttr, (val) => {
					delete props[val]
				});
				delete props.__specalAttr;
				return props;
			}, (props) => {
				return limit.map(props, (val, key) => {
					if(key === 'style'){
						return limit.assign({
							marginRight: '0px',
							width: props.width,
							height: props.height,
							boxSizing: 'border-box'
						}, val);
					};
					return val;
				});
			})(props);
		}
		render(){ 
			let me = this,
				props = me.clearAttr();
			return (
				<div className="kuma-form-item" style={ {padding: '0px'} }>
					<input {...props}/>
				</div>
			);
		}
		// 属性
		static defaultProps = {
			"width": '200px',
			"height": '30px',
			"__specalAttr": ["width", "height"],
			"style": {},
			"data-skip-hidden": "false",
			"data-need": "validator",
			"data-errormessage-required": "请输入当前表单的值。",
			"className": "fn-input-text fn-input-text-sm kuma-input",
			"type": "text"
		}
	};

	return View;

});