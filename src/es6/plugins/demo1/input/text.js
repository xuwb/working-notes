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
	var limit = require('common/limit2.0');

	//

	var View = function (_React$Component) {
		_inherits(View, _React$Component);

		function View() {
			_classCallCheck(this, View);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(View).apply(this, arguments));
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
					return limit.map(props, function (val, key) {
						if (key === 'style') {
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
		}, {
			key: 'render',
			value: function render() {
				var me = this,
				    props = me.clearAttr();
				return React.createElement(
					'div',
					{ className: 'kuma-form-item', style: { padding: '0px' } },
					React.createElement('input', props)
				);
			}
			// 属性

		}]);

		return View;
	}(React.Component);

	View.defaultProps = {
		"width": '200px',
		"height": '30px',
		"__specalAttr": ["width", "height"],
		"style": {},
		"data-skip-hidden": "false",
		"data-need": "validator",
		"data-errormessage-required": "请输入当前表单的值。",
		"className": "fn-input-text fn-input-text-sm kuma-input",
		"type": "text"
	};
	;

	return View;
});