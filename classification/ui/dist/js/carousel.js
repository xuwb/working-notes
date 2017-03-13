'use strict';

define(function (require, exports, module) {

    var Widget = require('Widget');

    var Carousel = Widget.extend({
        'className': 'Carousel',
        'attrs': {
            element: '.scroll',
            // element: {
            //     setter: function(){
            //         return this.get('element') + '-setter';
            //     },
            //     value: 'html'
            // },
            panelCls: '',
            nextNavCls: '',
            preNavCls: '',
            triggerCls: ''
        },

        propsInAttrs: ['element', 'testAttrs'],
        initialize: function initialize(config) {
            Carousel.superclass.initialize.call(this, config);
            console.log(this.attrs);
            // console.log(this.element)
        }
    });
    new Carousel({
        panelCls: '.scroll'
    });
    return Carousel;
});