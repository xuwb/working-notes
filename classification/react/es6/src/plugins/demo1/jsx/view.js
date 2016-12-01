"use strict";
/**
 * 模型
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(function (require, exports, module) {

	// 依赖
	var React = require('react');
	var Actions = require('./controller').Actions;

	// 非独立组件
	var Form = require('../input/form');
	var Text = require('../input/text');
	var Button = require('../input/button');

	var View = function (_React$Component) {
		_inherits(View, _React$Component);

		function View() {
			_classCallCheck(this, View);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(View).apply(this, arguments));
		}

		_createClass(View, [{
			key: 'render',
			value: function render() {
				var me = this,
				    props = me.props;
				return React.createElement(
					'div',
					null,
					React.createElement(
						Form,
						{ ajaxConfig: { type: 'get' }, paramName: 'param', onAjax: function onAjax(val) {
								console.log(val);
							} },
						React.createElement(
							'table',
							{ width: '100%', className: 'fn-table fn-table-input fn-MT20 fn-color-666', ref: 'tabel' },
							React.createElement(
								'tbody',
								null,
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										{ style: { textAlign: 'right' }, className: 'fn-LH30', width: '80' },
										'姓名：'
									),
									React.createElement(
										'td',
										null,
										React.createElement(Text, { name: 'name', 'data-required': 'true' })
									)
								),
								!props.hiddenTel ? React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										{ style: { textAlign: 'right' }, className: 'fn-LH30' },
										'电话号码：'
									),
									React.createElement(
										'td',
										null,
										React.createElement(Text, { name: 'mobile', 'data-required': 'true', 'data-errormessage-mobile': '请填写正确的电话号码', 'data-rule': 'mobile' })
									)
								) : void 0,
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										null,
										' '
									),
									React.createElement(
										'td',
										null,
										React.createElement(Button, { type: 'submit', style: { marginRight: "5px" } }),
										!props.hiddenTel ? React.createElement(Button, { type: 'button', style: { marginRight: "5px" }, value: '隐藏电话号码', onClick: Actions.hiddenTel }) : React.createElement(Button, { type: 'button', value: '显示电话号码', onClick: Actions.showTel })
									)
								)
							)
						)
					)
				);
			}
		}]);

		return View;
	}(React.Component);

	;

	return View;
});