"use strict";
define((require, exports, module) => {
    const Store = require('../common');
    // const InfoAction = require('demo2/stores/Controller/info').Actions;
    const Util = require('util');

    return Store({
        // store: [{"id": 1, "name": "xuwb"}, 
        //         {"id": 2, "name": "jack"}, 
        //         {"id": 3, "name": "tom"}, 
        //         {"id": 4, "name": "bean"}],
        store: [],
        init() {
            var me = this;
            Util.fetch('src/data.json').then(function(data) {
                me.trigger(me.store = data);
            }).catch(function(err) {
                console.log(err);
            });
        },
        getInitialState() {
            return this.store;
        },
        onAdd(userName) {
            if(!userName) return;

            let id = Util.randomStr(6);
            this.store.push({id: id, name: userName});

            this.trigger(this.store);
        },
        onModify(id, userName) {
            let index = this.getIndexById(this.store, id);
           
            if(index != -1) {
                this.store[index].name = userName;
            }
            this.trigger(this.store);
        },
        onDelete(id) {
            let index = this.getIndexById(this.store, id);
           
            if(index != -1) {
                this.store.splice(index, 1);
            }
            this.trigger(this.store);
        },
        getIndexById(arr, id) {
            var index = -1
             $.each(arr, function(i, val) {
                if(val.id == id) {
                    index = i;
                    return false;
                }
            });
            return index;
        }
    })
})
