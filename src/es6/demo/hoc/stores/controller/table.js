"use strict";

define(function (require, exports, module) {
    var Store = require('../common');
    // const InfoAction = require('demo2/stores/Controller/info').Actions;
    var Util = require('util');

    return Store({
        // store: [{"id": 1, "name": "xuwb"},
        //         {"id": 2, "name": "jack"},
        //         {"id": 3, "name": "tom"},
        //         {"id": 4, "name": "bean"}],
        store: [],
        init: function init() {
            var me = this;
            Util.fetch('src/data.json').then(function (data) {
                me.trigger(me.store = data);
            }).catch(function (err) {
                console.log(err);
            });
        },
        getInitialState: function getInitialState() {
            return this.store;
        },
        onAdd: function onAdd(userName) {
            if (!userName) return;

            var id = Util.randomStr(6);
            this.store.push({ id: id, name: userName });

            this.trigger(this.store);
        },
        onModify: function onModify(id, userName) {
            var index = this.getIndexById(this.store, id);

            if (index != -1) {
                this.store[index].name = userName;
            }
            this.trigger(this.store);
        },
        onDelete: function onDelete(id) {
            var index = this.getIndexById(this.store, id);

            if (index != -1) {
                this.store.splice(index, 1);
            }
            this.trigger(this.store);
        },
        getIndexById: function getIndexById(arr, id) {
            var index = -1;
            $.each(arr, function (i, val) {
                if (val.id == id) {
                    index = i;
                    return false;
                }
            });
            return index;
        }
    });
});