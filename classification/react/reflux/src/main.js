'use strict';

define(function (require) {
    var React = require('react'),
        ReactDOM = require('reactDom'),
        Containter = require('jsx/container');

    var widget = {};
    function outerFunc() {
        // outer[callback] = callback;
        widget = this;
    }
    $('button').on('click', function (e) {
        widget.onInfoClick('none');
    });

    ReactDOM.render(React.createElement(Containter, { dataSource: 'src/data.json', init: function init() {
            var me = this;
            $('button').on('click', function (e) {
                me.onInfoClick('none');
            });
        }, destroy: function destroy() {
            $('button').off('click');
        } }), document.getElementById('main'));
});