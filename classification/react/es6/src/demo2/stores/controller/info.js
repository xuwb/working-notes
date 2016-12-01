"use strict";

define(function (require, exports, module) {
    var Store = require('../common');
    return Store({
        initStore: { 'id': '', 'name': '', 'btnType': '添加' },
        init: function init() {
            // init 函数会在初始化时执行
            this.store = $.extend({}, this.initStore);
        },
        getInitialState: function getInitialState() {
            return this.store;
        },
        onReset: function onReset() {
            this.store = $.extend({}, this.initStore);
            this.trigger(this.store);
        },
        onItemModify: function onItemModify(item, infoBox) {
            if (!item) {
                console.error('modify item error');
                return;
            }
            // 循环拆解遍历获取input对象，设置焦点

            var input = null;
            this.getRefsByName(infoBox, function (ref) {
                if (ref.key == 'userName') {
                    input = ref.value;
                    return false;
                }
            });
            input && input.focus();

            // infoBox.focus();
            item.btnType = '修改';
            this.store = item;
            this.trigger(this.store);
        },
        onChangeInput: function onChangeInput(inputTxt) {
            this.store.name = inputTxt;
            this.trigger(this.store);
        }
    });
});