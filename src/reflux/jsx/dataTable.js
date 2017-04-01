'use strict';

// 主体

define(function (require, exports, module) {
    var React = require('react'),
        Reflux = require('reflux');

    var CrudBtn = require('./crudBtn'),
        DataRow = require('./dataRow');

    var CrudStore = require('stores/crud_store'),
        CrudActions = require('actions/crud_actions');

    var DataTable = React.createClass({
        displayName: 'DataTable',

        // mixins: [Reflux.connect(CrudStore, 'data')],           // 直接修改this.state.data
        mixins: [Reflux.listenTo(CrudStore, 'onDataChange')], // crudStore 变化时，调用 onDataChange

        getInitialState: function getInitialState() {
            return {
                data: []
            };
        },
        // 侦听CrudStore的变化，
        onDataChange: function onDataChange(data, func) {
            var sourceData = this.state.data;

            switch (data.type) {
                case 'init':
                    this.setState({ data: data.value });
                    break;
                case 'add':
                    sourceData.push(data.value);
                    this.setState({ data: sourceData });
                    break;
                case 'modify':
                    var newData = sourceData.map(function (item) {
                        if (item.id == data.value.id) {
                            item = data.value;
                        }
                        return item;
                    });
                    this.setState({ data: newData });
                    break;
                case 'delete':
                    var list = this.state.data;
                    var index = list.indexOf(data.value);
                    index != -1 && list.splice(index, 1);
                    this.setState({ data: list });
                    break;
            }
            if (typeof func === 'function') func();
        },
        onTableBtnClick: function onTableBtnClick(type, data) {
            switch (type) {
                case 'modify':
                    // 点击修改按钮，在 container 组件中调用显示修改框方法
                    this.props.callbackParent(data);
                    break;
                case 'delete':
                    // var list = this.state.data;
                    // var index = list.indexOf(data);
                    // index != -1 && list.splice(index, 1);
                    // this.setState({data: list});

                    // 统一在 store 中操作数据
                    CrudActions.delete(data);
                    break;
            }
        },
        render: function render() {
            var list = [];
            // console.log(this.state.data);
            this.state.data.forEach(function (value) {
                list.push(React.createElement(DataRow, { key: value.id, data: value, callbackParent: this.onTableBtnClick }));
            }.bind(this));

            return React.createElement(
                'table',
                { className: 'col-table', ref: 'tableList' },
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'td',
                            { width: '100' },
                            '标题'
                        ),
                        React.createElement(
                            'td',
                            { width: '80' },
                            '作者'
                        ),
                        React.createElement(
                            'td',
                            { width: '150' },
                            '发布时间'
                        ),
                        React.createElement(
                            'td',
                            { width: '150' },
                            '操作'
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    list
                )
            );
        }
        // componentDidMount: function(){
        //     var self = this;
        //     $.ajax({
        //         type: 'get',
        //         url: self.props.source,
        //         success: function(data){
        //             self.setState({
        //                 data: data
        //             });
        //             self.props.setLastId(parseInt(data[data.length-1].id));
        //         }
        //     })
        // }
    });
    module.exports = DataTable;
});