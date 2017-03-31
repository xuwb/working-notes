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
        propsInAttrs: ['testAttrs'],
        initialize: function initialize(config) {
            Carousel.superclass.initialize.call(this, config);
            // console.log(this.attrs);
        },
        initProps: function initProps() {
            console.log(this.get('trigger'));
        }
    });
    new Carousel({
        // template: '<div class="aaa"></div>',
        element: '.scroll'
    });
    return Carousel;
});