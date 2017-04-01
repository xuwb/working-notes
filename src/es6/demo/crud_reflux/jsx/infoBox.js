"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(function (require, exports, module) {
    var React = require('react'),
        Action = require('../actions/tableAction');

    var InfoBox = function (_React$Component) {
        _inherits(InfoBox, _React$Component);

        function InfoBox(props) {
            _classCallCheck(this, InfoBox);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(InfoBox).call(this, props));
            // this.clickHandler = this.clickHandler.bind(this);
        }
        // clickHandler = e => {
        //     console.log(this);
        // }


        _createClass(InfoBox, [{
            key: 'clickHandler',
            value: function clickHandler() {
                Action.add({ id: 22, name: 'tip' });
            }
        }, {
            key: 'render',
            value: function render() {
                return React.createElement(
                    'tfoot',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'td',
                            null,
                            React.createElement('input', { id: 'inputName', type: 'text' })
                        ),
                        React.createElement(
                            'td',
                            null,
                            React.createElement(
                                'button',
                                { className: 'JS_addBtn btn btn-default', onClick: this.clickHandler.bind(this) },
                                '添加'
                            )
                        )
                    )
                );
            }
        }]);

        return InfoBox;
    }(React.Component);

    return InfoBox;
});