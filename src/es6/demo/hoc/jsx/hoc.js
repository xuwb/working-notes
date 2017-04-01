'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(function (require, exports, module) {
    var React = require('react'),
        Reflux = require('reflux');

    return function (Wrapper, Store) {
        Store = Reflux.connect(Store, "data");
        var state = Store.getInitialState();
        delete Store.getInitialState; // 以免覆盖 Hoc 中的 getInitialState 方法，不删除也能执行，会出现警告提示

        var Hoc = function (_React$Component) {
            _inherits(Hoc, _React$Component);

            function Hoc(props) {
                _classCallCheck(this, Hoc);

                var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Hoc).call(this, props));

                _this.state = state;
                return _this;
            }

            _createClass(Hoc, [{
                key: 'render',
                value: function render() {
                    // console.log(this.state);
                    return React.createElement(Wrapper, _extends({ ref: 'wrapper' }, this.props, this.state));
                }
            }]);

            return Hoc;
        }(React.Component);
        // 将Store的属性合并到Hoc.prototype。trigger方法才能生效


        $.extend(Hoc.prototype, Store);
        // console.log(Hoc.prototype);
        return Hoc;
    };
});