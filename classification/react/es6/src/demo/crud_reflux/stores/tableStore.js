"use strict";

define(function (require, exports, module) {
    var Reflux = require('reflux'),
        TableAction = require('../actions/tableAction');

    return Reflux.createStore({
        listenables: [TableAction],
        store: [{ "id": 1, "name": "xuwb" }, { "id": 2, "name": "jack" }, { "id": 3, "name": "tom" }, { "id": 4, "name": "bean" }],
        getInitialState: function getInitialState() {
            return this.store;
        },
        onAdd: function onAdd(item) {
            this.store.push(item);

            this.trigger(this.store, function () {
                console.log('success');
            });
        },
        onDelete: function onDelete() {}
    });
});