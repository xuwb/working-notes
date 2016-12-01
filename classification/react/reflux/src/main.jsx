'use strict';

define(function(require) {
	var React     = require('react'),
		ReactDOM  = require('reactDom'),
		Containter = require('jsx/container');

    var widget = {};
    function outerFunc(){
        // outer[callback] = callback; 
        widget = this;
    }
    $('button').on('click', function(e){
        widget.onInfoClick('none')
    })

	ReactDOM.render(
		<Containter dataSource="src/data.json" init={function(){
            let me = this;
            $('button').on('click', function(e){
                me.onInfoClick('none')
            })
        }} destroy={ function(){
            $('button').off('click');
        } } />, 
		document.getElementById('main')
	);
})