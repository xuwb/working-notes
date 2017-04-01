'use strict';

define(function (require, exports, module) {
    var React = require('react'),
        CrudActions = require('../actions/crud_actions'),
        CrudBtn = require('./crudBtn');

    // 添加修改信息
    var InfoBox = React.createClass({
        displayName: 'InfoBox',

        getInitialState: function getInitialState() {
            return { id: null, title: '', author: '' };
        },
        okHandler: function okHandler(e) {
            var newInfo, showState;

            if (!this.refs.title.value) {
                newInfo = null;
                showState = 'block';
                alert('标题不能为空');
            } else {
                newInfo = {
                    id: this.state.id,
                    title: this.refs.title.value,
                    author: this.refs.author.value ? this.refs.author.value : 'none',
                    description: 'none',
                    pubtime: new Date()
                };
                showState = 'none';
                CrudActions.dataChange(newInfo);
            }
            this.reset();
            // console.log(CrudActions);
            this.props.callbackParent(showState);
        },
        cancelHander: function cancelHander(e) {
            this.reset();
            this.props.callbackParent('none');
        },
        changeHandler: function changeHandler(e) {
            var obj = {};
            obj[e.target.getAttribute('name')] = e.target.value;
            this.setState(obj);
        },
        reset: function reset() {
            this.setState({
                title: '',
                author: ''
            });
        },
        render: function render() {
            // 不能在渲染过程中（render，componentDidUpdate等）调用 this.setState，会导致死循环
            return React.createElement(
                'form',
                null,
                React.createElement(
                    'ul',
                    null,
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'span',
                            null,
                            '标题'
                        ),
                        React.createElement(
                            'span',
                            null,
                            React.createElement('input', { ref: 'title', name: 'title', type: 'text', value: this.state.title, onChange: this.changeHandler })
                        )
                    ),
                    React.createElement(
                        'li',
                        null,
                        React.createElement(
                            'span',
                            null,
                            '作者'
                        ),
                        React.createElement(
                            'span',
                            null,
                            React.createElement('input', { ref: 'author', name: 'author', type: 'text', value: this.state.author, onChange: this.changeHandler })
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-btn' },
                    React.createElement(CrudBtn, { btnName: '确定', className: 'btn btn-ok', callbackParent: this.okHandler }),
                    React.createElement(CrudBtn, { btnName: '取消', className: 'btn btn-cancel', callbackParent: this.cancelHander })
                )
            );
        }
    });
    return InfoBox;
});