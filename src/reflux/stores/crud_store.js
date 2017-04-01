'use strict';

define(function(require, exports, module) {
    var Reflux      = require('reflux'),
        CrudActions = require('../actions/crud_actions'),
        Utils       = require('../common/util');

    var CrudStore = Reflux.createStore({
        listenables: [CrudActions],

        init: function() {
            this.onFetch();
        },
        onFetch: function() {
            var self = this;
            Utils.fetch('/src/reflux/data.json')
                .then(function(data) {
                    self.trigger({
                        type:  'init',
                        value: data
                    });
                })
                .catch(function(err) {
                    console.log(err);
                })
            // var self = this;
            // $.ajax({
            //     type: 'get',
            //     url: 'src/data.json',
            //     success: function(data){
            //         self.trigger(data);
            //     }
            // });
        },
        onDataChange: function(newInfo) {
            newInfo.id ? this.onModify(newInfo) : this.onAdd(newInfo);
        },
        onAdd: function(newInfo) {
            newInfo.id = Utils.randomBy(1000);
            this.trigger({
                type:  'add',
                value: newInfo
            }, function(){
                console.log('addSuccess');
            });
        },
        onModify: function(newInfo) {
            this.trigger({
                type:  'modify',
                value: newInfo
            });
        },
        onDelete: function(delInfo) {
            this.trigger({
                type:  'delete',
                value: delInfo
            });
        }
    })

    return CrudStore;

});