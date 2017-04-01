"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(function (require, exports, module) {

    var React = require('react'),
        Reflux = require('reflux'),
        Store = require('../stores/tableStore'),
        Hoc = require('./hoc'),
        InfoBox = require('./infoBox');

    // ==================测试store.listen=================
    // var actions = Reflux.createActions([
    //   'hello',
    //   'greet',
    //   'say'
    //   ]);

    // var store = Reflux.createStore({
    //   listenables: [actions],
    //   init: function () {
    //     // 对actions绑定store.listen侦听
    //     this.joinTrailing(actions.hello, actions.greet, actions.say, this.trigger);
    //   },
    //   onGreet: function() {
    //     console.log(arguments[0] + 11)
    //   }
    // });

    // store.listen(function() {
    //     [].slice.call(arguments).forEach(function(val, i){
    //         console.log('triggering with', val);
    //     })
    // });

    // actions.hello('bubu');
    // actions.greet('chacha');
    // actions.say('dockers');
    // actions.hello(1,2,3);
    // actions.greet('miku');
    // actions.say('dockers');

    var DataTable = function (_React$Component) {
        _inherits(DataTable, _React$Component);

        function DataTable(props) {
            _classCallCheck(this, DataTable);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(DataTable).call(this, props));
        }

        _createClass(DataTable, [{
            key: 'modifyClick',
            value: function modifyClick(e) {
                var id = e.target.getAttribute('data-id');
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                var list = this.props.data.map(function (val, index) {
                    return React.createElement(
                        'tr',
                        { key: val.id },
                        React.createElement(
                            'td',
                            null,
                            val.name
                        ),
                        React.createElement(
                            'td',
                            null,
                            React.createElement(
                                'button',
                                { className: 'JS_delBtn btn btn-primary', 'data-id': val.id },
                                '删除'
                            ),
                            React.createElement(
                                'button',
                                { className: 'JS_modBtn btn btn-info', 'data-id': val.id, onClick: _this2.modifyClick.bind(_this2) },
                                '修改'
                            )
                        )
                    );
                });
                return React.createElement(
                    'table',
                    null,
                    React.createElement(
                        'thead',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            React.createElement(
                                'th',
                                { width: '150' },
                                '姓名'
                            ),
                            React.createElement(
                                'th',
                                { width: '120' },
                                '操作'
                            )
                        )
                    ),
                    React.createElement(
                        'tbody',
                        null,
                        list
                    ),
                    React.createElement(InfoBox, null)
                );
            }
        }]);

        return DataTable;
    }(React.Component);

    return Hoc(DataTable, Store);
});