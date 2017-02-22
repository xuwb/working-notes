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
        
        propsInAttrs: ['element', 'testAttrs'],
        initialize: function(config) {
            Carousel.superclass.initialize.call(this, config);
            console.log(this.attrs);
            // console.log(this.element)
        }
    });
    new Carousel({
        panelCls: '.scroll'
    });
    return Carousel;
})