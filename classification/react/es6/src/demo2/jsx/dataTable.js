"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(function (require, exports, module) {

    var React = require('react'),
        Reflux = require('reflux'),
        TableController = require('demo2/stores/Controller/table'),
        InfoAction = require('demo2/stores/Controller/info').Actions,
        TableStore = TableController.Store,
        TableAction = TableController.Actions,
        Hoc = require('./hoc'),
        InfoBox = require('./infoBox');

    var DataTable = function (_React$Component) {
        _inherits(DataTable, _React$Component);

        function DataTable(props) {
            _classCallCheck(this, DataTable);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DataTable).call(this, props));

            _this.deleteClick = function (e) {
                var id = e.target.getAttribute('data-id');
                TableAction.delete(id);
            };

            return _this;
        }

        _createClass(DataTable, [{
            key: 'modifyClick',
            value: function modifyClick(e) {
                var id = e.target.getAttribute('data-id');
                var item = null;
                $.each(this.props.data, function (i, val) {
                    if (val.id == id) {
                        item = val;
                        return false;
                    }
                });
                InfoAction.itemModify(item, this.refs.infoBox);
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                // 普通元素 button 不能通过属性传递 object 对象
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
                                { ref: 'btn_modify', className: 'JS_modBtn btn btn-info', 'data-id': val.id, onClick: _this2.modifyClick.bind(_this2) },
                                '修改'
                            ),
                            React.createElement(
                                'button',
                                { ref: 'btn_delete', className: 'JS_delBtn btn btn-primary', 'data-id': val.id, onClick: _this2.deleteClick },
                                '删除'
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
                    React.createElement(InfoBox, { ref: 'infoBox' })
                );
            }
        }]);

        return DataTable;
    }(React.Component);

    return Hoc(DataTable, TableStore);
});