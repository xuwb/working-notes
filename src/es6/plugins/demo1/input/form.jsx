"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	// 依赖
	const React = require('react');
	const Validator = require('common/validator');
	const limit = require('common/limit2.0');
	const domUtil = require('common/domUtil');
	const Ajax = require('model/ajax/main');

	// 
	class View extends React.Component {
		state = {
			isExecute: false,
			isSubmit: false
		}
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
				return limit.assign({}, props);
			})(props);
		}
		submit(){
			let me = this,
				state = me.state;
			state.isSubmit = true;
		}
		// 初始化验证
		initValidator(){
			let me = this,
				state = me.state,
				props = me.props;
			me.validatorExp && me.validatorExp.destroy();
			me.validatorExp = Validator.use(me.refs.form, '[data-need="validator"]', {autoSubmit: false});
			me.validatorExp.on('formValidated', function(a, b){
				state.isExecute = true;
				if(!a){
					if(state.isSubmit){
						props.onSubmit();
						me.initAjax();
					}
				}else{
					limit['!!!']( limit.filter(b, (val) => val[0]) );
				};
			});
			state.isExecute && me.validatorExp.execute();
		}
		// 发送请求
		initAjax(){
			let me = this,
				props = me.props;
			new Ajax(limit.assign({
				request: props.action,
				parseForm: me.refs.form,
				paramName: props.paramName
			}, props.ajaxConfig)).on('ajaxSuccess', props.onAjax).submit();
		}
		// 组件完成更新
		componentDidUpdate(){
			let me = this,
				state = me.state;
			state.isSubmit = false;
			me.validatorExp.destroy();
			me.initValidator();
		}
		// // 初始化完成组件
		componentDidMount(){
			let me = this,
				props = me.props;
			me.initValidator();
			props.isAutoAjax && me.initAjax(); 
		}
		// 销毁组件
		componentWillUnmount(){
			let me = this;
			me.validatorExp.destroy();
		}
		// 属性
		static defaultProps = {
			"onSubmit": limit.K,
			"onAjax": limit.K,
			"isAutoAjax": false,
			"ajaxConfig": {},
			"__specalAttr": ['onSubmit', 'onAjax', 'isAutoAjax', 'ajaxConfig'],
			"action": './data.json'
		}
		render(){
			let me = this,
				props = me.clearAttr();
			console.log(props);
			return (
				<form {...props} ref="form" onSubmit={me.submit.bind(me)} >
					{props.children}
				</form>
			);
		}
	};

	return View;

});