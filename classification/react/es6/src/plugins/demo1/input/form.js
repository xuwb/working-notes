"use strict";
/**
 * 模型
 */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(function (require, exports, module) {

	// 依赖
	var React = require('react');
	var Validator = require('common/validator');
	var limit = require('common/limit2.0');
	var domUtil = require('common/domUtil');
	var Ajax = require('model/ajax/main');

	//

	var View = function (_React$Component) {
		_inherits(View, _React$Component);

		function View() {
			var _Object$getPrototypeO;

			var _temp, _this, _ret;

			_classCallCheck(this, View);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(View)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
				isExecute: false,
				isSubmit: false
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}

		_createClass(View, [{
			key: 'clearAttr',
			value: function clearAttr() {
				var me = this,
				    props = me.props;
				return limit.compose(function (props) {
					limit.each(props.__specalAttr, function (val) {
						delete props[val];
					});
					delete props.__specalAttr;
					return props;
				}, function (props) {
					return limit.assign({}, props);
				})(props);
			}
		}, {
			key: 'submit',
			value: function submit() {
				var me = this,
				    state = me.state;
				state.isSubmit = true;
			}
			// 初始化验证

		}, {
			key: 'initValidator',
			value: function initValidator() {
				var me = this,
				    state = me.state,
				    props = me.props;
				me.validatorExp && me.validatorExp.destroy();
				me.validatorExp = Validator.use(me.refs.form, '[data-need="validator"]', { autoSubmit: false });
				me.validatorExp.on('formValidated', function (a, b) {
					state.isExecute = true;
					if (!a) {
						if (state.isSubmit) {
							props.onSubmit();
							me.initAjax();
						}
					} else {
						limit['!!!'](limit.filter(b, function (val) {
							return val[0];
						}));
					};
				});
				state.isExecute && me.validatorExp.execute();
			}
			// 发送请求

		}, {
			key: 'initAjax',
			value: function initAjax() {
				var me = this,
				    props = me.props;
				new Ajax(limit.assign({
					request: props.action,
					parseForm: me.refs.form,
					paramName: props.paramName
				}, props.ajaxConfig)).on('ajaxSuccess', props.onAjax).submit();
			}
			// 组件完成更新

		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				var me = this,
				    state = me.state;
				state.isSubmit = false;
				me.validatorExp.destroy();
				me.initValidator();
			}
			// // 初始化完成组件

		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				var me = this,
				    props = me.props;
				me.initValidator();
				props.isAutoAjax && me.initAjax();
			}
			// 销毁组件

		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				var me = this;
				me.validatorExp.destroy();
			}
			// 属性

		}, {
			key: 'render',
			value: function render() {
				var me = this,
				    props = me.clearAttr();
				console.log(props);
				return React.createElement(
					'form',
					_extends({}, props, { ref: 'form', onSubmit: me.submit.bind(me) }),
					props.children
				);
			}
		}]);

		return View;
	}(React.Component);

	View.defaultProps = {
		"onSubmit": limit.K,
		"onAjax": limit.K,
		"isAutoAjax": false,
		"ajaxConfig": {},
		"__specalAttr": ['onSubmit', 'onAjax', 'isAutoAjax', 'ajaxConfig'],
		"action": './data.json'
	};
	;

	return View;
});