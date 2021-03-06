define(function(require, exports, module){

    const Widget = require('Widget');

    let Carousel = Widget.extend({
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
        initialize: function(config) {
            Carousel.superclass.initialize.call(this, config);
            // console.log(this.attrs);
        },
        initProps: function(){
            console.log(this.get('trigger'));
        }
    });
    new Carousel({
        // template: '<div class="aaa"></div>',
        element: '.scroll'
    });
    return Carousel;
})