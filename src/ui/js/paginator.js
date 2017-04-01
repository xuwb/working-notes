"use strict";

define(function(require, exports, module) {

    //依赖
    var Widget = require('Widget'),
        handlerbars = require('./common/handlerbars');

    //模板
    //焦点样式:active 不可用样式:disabled
    var template = handlerbars.compile([
        '<nav class="clearfix">',
            '<ul class="pagination" style="float:left;">',
                '<li class="JS-click-prev page-prev {{#isEqual nowTarget 1}}disabled{{/isEqual}}" data-label="prev"><a href="javascript:;" aria-label="Previous"><span aria-hidden="true" class="kuma-icon kuma-icon-triangle-left">«</span></a></li>',
                '{{#each list}}',
                '<li class="JS-click-active {{#isEqual this ../nowTarget}}active{{/isEqual}} {{#isEqual this "..."}}other{{/isEqual}}" data-now-target="{{this}}"><a href="javascript:;">{{this}}</li>',
                '{{/each}}',
                '<li class="JS-click-next page-next {{#isEqual nowTarget totle}}disabled{{/isEqual}}" data-label="next"><a href="javascript:;" aria-label="Next"><span aria-hidden="true" class="kuma-icon kuma-icon-triangle-right">»</span></a></li>',
            '</ul>',
            '{{\#if showCount}}',
            '<div style="float:left;margin-left:10px;margin-top:20px;" class="form-group-sm">共 {{count}} 条 </div>',
            '{{/if}}',
            '{{\#if showSizeList}}',
            '<div style="float:left;margin-left:10px;margin-top:20px;" class="form-group-sm">',
            '<select class="JS-select-size page-size">',
                '{{#each sizeList}}',
                '<option value={{value}} {{\#if selected}}selected{{/if}}>{{value}}条/页</option>',
                '{{/each}}',
            '</select>',
            '</div>',
            '{{/if}}',
            '{{\#if showJump}}',
            '<div style="float:left;margin-left:10px;margin-top:20px;" class="form-group-sm">',
            '<span class="fn-FS12">跳到<input type="text" class="form-control JS-target-page" style="display:inline-block;width:50px;" />页</span>',
            '</div>',
            '{{/if}}',
        '</nav>'
    ].join(''));

    //类
    var Paginator = Widget.extend({
        //类名
        className:  'Paginator',
        //属性
        attrs: {
            nowTarget: 1,   //当前第几页
            className: 'paginator',
            showJump: true,
            showCount: false,
            side: 1, //选择项两侧显示的页码数量
            totle: 100, //总数量
            sizeList: [{value: 10, selected: true}, {value: 20}, {value: 30}],
            size: {
                value: 10,
                getter: function(val) {
                    var me = this;
                    var pageSize = val;
                    var sizeSelect = me.$('.JS-select-size');

                    // 每页数量下拉框显示的话
                    // 第一次未渲染使用数组。第二次使用选择值
                    if(sizeSelect.length) {
                        pageSize = sizeSelect.val();
                    } else {
                        pageSize = Paginator.getSize(pageSize, me.get('sizeList'));
                    }

                    return pageSize;
                }
            }
        },
        //事件
        events: {
            //上一个
            'click .JS-click-prev': 'paginatorPrevNext',
            //下一个
            'click .JS-click-next': 'paginatorPrevNext',
            //焦点点击
            'click .JS-click-active': function(e) {
                var me = this,
                    node = $(e.target).closest('.JS-click-active'),
                    index = node.data('nowTarget');
                if (!node.hasClass('active') && !node.hasClass('other')) {
                    me.paginatorJump(index, e);
                }
            },
            'change .JS-select-size': function(e){
                var me = this,
                    select = e.target,
                    pageSize = select.value,
                    sizeList = me.get('sizeList');

                sizeList = $.map(sizeList, function(item, i){
                    delete item.selected;
                    item.value == pageSize && (item.selected = true);
                    return item;
                });

                me.paginatorJump(0, e);
            },
            //跳转
            'pageJump': function(e) {
                var me = this,
                    pageVal = me.$('.JS-target-page').val(),
                    index = ~~pageVal;

                if(!pageVal) return;

                me.paginatorJump(index, e);
            }
        },
        //初始化数据
        initProps: function() {
            var me = this;
            me.paginatorRenderData();
        },
        //入口
        setup: function() {
            var me = this;
            me.paginatorRender();
            me.paginatorEventJump();
        },
        propsInAttrs: ['afterRender'],
        afterRender: function() {
            console.log('rendered');
        },
        //更新数据
        paginatorRenderData: function() {
            var me = this,
                totle = me.get('totle'),
                sizeList = me.get('sizeList'),
                nowTarget = me.get('nowTarget'),
                side = me.get('side'),
                paginatorData,
                paginatorMax,
                list,
                index = 1,
                showSizeList = $.isArray(sizeList) && sizeList.length;

            //每页显示数量
            var size = me.get('size');
            //数据
            paginatorData = me.paginatorData = {
                showCount: me.get('showCount'),
                showJump: me.get('showJump'),
                showSizeList: showSizeList,
                sizeList: me.get('sizeList')
            };
            //总数据
            paginatorData.count = totle;
            //最大值
            paginatorMax = me.paginatorMax = paginatorData.totle = Math.ceil(totle / size);
            //当前值
            paginatorData.nowTarget = checkMaxMin(nowTarget, paginatorMax);

            //按钮
            list = paginatorData.list = [];

            //页数少的情况
            if (paginatorMax <= 2 * side + 2) {
                for (; index <= paginatorMax; index++) {
                    list.push(index);
                }
            } else {
                list.push(1);
                if(nowTarget > side + 2 ) {
                    list.push('...');
                }
                var lpage = (nowTarget-side) > 1 ? (nowTarget-side) : 2;
                var rpage = (nowTarget+side) < paginatorMax ? (nowTarget+side) : (paginatorMax-1);
                if(nowTarget <= side + 1) {
                    rpage = 2 * side + 1;
                }
                if(nowTarget >= paginatorMax - side) {
                    lpage = paginatorMax - 2 * side;
                }
                for(index = lpage; index <= rpage; index++) {
                    list.push(index);
                }
                if(nowTarget < paginatorMax - side - 1) {
                    list.push('...');
                }
                list.push(paginatorMax);
            }
            return me;
        },
        //渲染DOM
        paginatorRender: function() {
            var me = this;
            //初始化模板
            me.element.html(template(me.paginatorData));
            me.trigger('after:render');
            return me;
        },
        //上一个下一个
        paginatorPrevNext: function(e) {
            //陈志完fix587320， ie8下>>跳转到最后一页
            e.stopPropagation();
            var me = this;
            //事件对象是必须存在的
            if (e && e.target) {
                var node = $(e.target).closest('[data-label]'),
                    label = node.data('label'),
                    nowTarget = me.get('nowTarget'),
                    index = label === 'prev' ? --nowTarget : ++nowTarget; //自增还是自减
                if (!node.hasClass('disabled')) {
                    //最大最小
                    me.paginatorJump(index, e);
                }
            } else {
                me.log('缺少事件对象。');
            }
        },
        paginatorJump: function(index, e) {
            var me = this;
            index = checkMaxMin(index, me.paginatorMax);
            if(index != me.get('nowTarget') || $(e.target).hasClass('JS-select-size')){
                me.set('nowTarget', index);
                me.paginatorRenderData().paginatorRender();
                me.trigger('change', index, e);
            }
            return me;
        },
        // 绑定页面跳转事件
        paginatorEventJump: function() {
            var me = this,
                element = me.element;

            if(me.get('showJump')) {
                me.delegateEvents(document, 'click.paginator', function(e) {
                    if(!$(e.target).hasClass('JS-target-page')) {
                        element.trigger('pageJump', e);
                    }
                });
                me.delegateEvents(document, 'keyup.paginator', function(e){
                    if(e.keyCode == 13) {
                        element.trigger('pageJump', e);
                    }
                });
            }
        },
        //重置
        paginatorReload: function(config) {
            var me = this;
            //重置
            me.resetConfig(config);
            me.paginatorRenderData().paginatorRender();
            return me;
        },
        destroy: function() {
            var me = this;
            me.element.html('');
            Paginator.superclass.destroy.call(this);
        },
        Statics: {
            getSize: function(size, sizeList){
                var pageSize = size;
                if($.isArray(sizeList) && sizeList.length) {
                    var selectSize = sizeList.filter(function(val){
                        return val.selected
                    });
                    pageSize = selectSize.length ? selectSize[0].value : sizeList[0].value;
                } 
                return pageSize;
            }
        }
    });

    //函数:确定最大最小值
    function checkMaxMin(index, max) {
        index >= max && (index = max);
        index < 1 && (index = 1);
        return index;
    }

    return Paginator

});
