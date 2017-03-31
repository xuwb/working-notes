'use strict';

(function () {
    var config = {
        base: '../src/',
        alias: {
            'jquery': 'js/widget/jquery',
            'handlebars': '/libs/handlebars-v4.0.5.js',
            'Base': 'js/widget/base',
            'Widget': 'js/widget/widget'
        },
        debug: true,
        charset: 'utf-8'
    };
    seajs.config(config);

    // 在浏览器下新增接口，确保异步加载，同步执行。
    ;(function (seajs, $) {

        var useList = [],
            arrPro = Array.prototype,
            concat = arrPro.concat,
            slice = arrPro.slice;
        // 暴露出增加的方法
        seajs.add = function () {
            return useList = concat.apply(useList, slice.call(arguments));
        };

        // DOM加载完成
        $(function () {
            var $body = $('body'),
                widgetMap = [],
                widgetArr = [];
            // 遍历节点
            $('[widget]').each(function () {
                var self = $(this);
                widgetMap[widgetArr.push(self.attr('widget')) - 1] = self;
            });

            // 顺序: 
            // 1. <div widget="x"></div>; 配置 widget-trigger 就是用trigger入参
            // 2. sea.add('x');
            useList = concat.call(arrPro, widgetArr, useList);
            useList.length && seajs.use(useList, function () {
                $.each(arguments, function (i) {
                    var element = widgetMap[i],
                        config = {};
                    element && (config[element.attr('widget-trigger') === undefined ? 'element' : 'trigger'] = element);
                    typeof this === 'function' && new this(config);
                });
            });
        });
        $(window).on('load', function () {
            window.isLoaded = true;
        });
    })(seajs, $);

    // 兼容cmd规范
    if (typeof define === 'function') {
        define(function (require, exports, module) {
            module.exports = config;
        });
    }

    return config;
})();