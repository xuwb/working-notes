'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

define(function (require) {
    var React = require('react'),
        ReactDOM = require('reactDom'),
        Containter = require('jsx/container');

    // var widget = {};
    // function outerFunc(){
    //     // outer[callback] = callback;
    //     widget = this;
    // }
    // $('button').on('click', function(e){
    //     widget.onInfoClick('none')
    // })

    // ReactDOM.render(
    //     <Containter dataSource="src/data.json" init={function(){
    //         let me = this;
    //         $('button').on('click', function(e){
    //             me.onInfoClick('none')
    //         })
    //     }} destroy={ function(){
    //         $('button').off('click');
    //     } } />,
    //     document.getElementById('main')
    // );
    ReactDOM.render(React.createElement(Containter, _extends({
        dataSource: "src/data.json"
    }, {
        init: function init() {
            var me = this;
            $('button').on('click', function (e) {
                me.onInfoClick('none');

                console.log('outButton');
            });
        },
        destroy: function destroy() {
            $('button').off('click');
        }
    })), document.getElementById('main'));
});