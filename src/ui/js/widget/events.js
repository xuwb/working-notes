"use strict";
define(function(require, exports, module){
    
    var eventSplitter = /\s+/;
    function Events() {}

    Events.prototype.on = function(events, callback, context) {
        var cache, event, list;
        if(!callback) return this;

        cache = this.__events || (this.__events = {});
        events = events.split(eventSplitter);

        // o1 = o2 = {}。若o2 = {param：value}，o1不变仍为{}；若o2[param] = value，则o1 也等于 {param：value}
        // a1 = a2 = []。若a2 = [11], a1不变仍为[]；若a2.push(11)或a2[0] = 11，则a1 也等于 [11]
        // 故 this.__events = cache = {event: [callback, context]};

        while(event = events.shift()) {
            list = cache[event] || (cache[event] = []);
            list.push(callback, context);
        }
        return this;
    }
    Events.prototype.once = function(events, callback, context) {
        var that = this;
        function cb() {
            that.off(events, cb);
            callback.apply(context, arguments);
        }
        return this.on(events, cb, context);
    }
    // 根据不同的情况 delete this.__events[event]
    Events.prototype.off = function(events, callback, context) {
        var cache, event, list, i;
        if(!(cache = this.__events)) return this;
        if(!(events || callback || context)) {
            delete this.__events;
            return this;
        }
        events = events && events.split(eventSplitter) || keys(cache);

        while(event = events.shift()) {
            // list = cache[event] = this.events[event] = [callback, context]
            if(!(list = cache[event])) continue;
            if(!(callback || context)) {
                //  只能delete属性，不能delete声明，故不能delete list
                delete cache[event];
                continue;
            }
            // callback 和 context 均等于 this.__events[event] 中的值，才删除
            for(i = list.length - 2; i >= 0; i -= 2) {
                if(!(callback && callback !== list[i] ||
                     context && context !== list[i + 1])) {
                    list.splice(i, 2);
                }
            }
        }
        return this;
    }
    // 执行event方法的同时，执行 all 方法。（设置 event.on('all', func)，可作为所有事件的共有方法）
    // event.trigger('event', args)。args为 'event'对应的 callback 的参数
    Events.prototype.trigger = function(events) {
        var list, all, event, cache, i, len, rest = [], returned = true;

        events = events.split(eventSplitter);
        if(!(cache = this.__events)) return this;

        for(i = 1, len = arguments.length; i < len; i++) {
            rest[i - 1] = arguments[i];
        }
        while(event = events.shift()) {
            (list = cache[event]) && (list = list.slice());
            (all = cache.all) && (all = all.slice());

            if(event != 'all') {
                returned = triggerEvents(list, rest, this) && returned;
            } 
            returned = triggerEvents(all, [event].concat(rest), this) && returned;
        }
        return returned;
    }
    Events.prototype.emit = Events.prototype.trigger;

    Events.mixTo = function(receiver) {
        var proto = Events.prototype;
        if(isFunction(receiver)) {
            keys(proto).forEach(function(key){
                receiver.prototype[key] = proto[key];
            })
        } else {
            var event = new Events;
            for(var key in proto) {
                if(proto.hasOwnPrototype(key)) {
                    copyProto(key);
                }
            }
        }
        function copyProto(key) {
            // 功能与 receiver[key] = proto[key] 相同，这样写可修改this指向，改为event
            receiver[key] = function() {
                proto[key].apply(event, Array.prototype.slice.call(arguments));
                return this;  // 相当于 return receiver
            }
        }
    }
    module.exports = Events;

    // ==== Helper
    var keys = Object.keys;
    if(!keys) {
        keys = function(o) {
            var result = [];
            for(var key in o) {
                if(o.hasOwnProperty(key)) {
                    result.push(key);
                }
            }
            return result;
        }
    }
    Array.prototype.forEach || (Array.prototype.forEach = function(func) {
        for(var i = 0, len = this.length; i < len; i++) {
            func.call(this, this[i], i, this);
        }
    });

    function triggerEvents(list, args, context) {
        var pass = true;
        if(list) {
            var i = 0, len = list.length, a1 = args[0], a2 = args[1], a3 = args[2];
            switch(args.length) {
                case 0:
                    for(; i < len; i += 2) {
                        pass = list[i].call(list[i+1] || context) !== false && pass;
                    }
                    break;
                case 1:
                    for(; i < len; i += 2) {
                        pass = list[i].call(list[i+1] || context, a1) !== false && pass;
                    }
                    break;
                case 2:
                    for(; i < len; i += 2) {
                        pass = list[i].call(list[i+1] || context, a1, a2) !== false && pass;
                    }
                    break;
                case 3:
                    for(; i < len; i += 2) {
                        pass = list[i].call(list[i+1] || context, a1, a2. a3) !== false && pass;
                    }
                    break;
                default:
                    for(; i < len; i += 2) {
                        pass = list[i].apply(list[i+1] || context, args) !== false && pass;
                    }
                    break;
            }
        }
        return pass;
    }
    function isFunction(obj) {
        return Object.prototype.toString.call(obj) === '[object Function]';
    }
})

    // 测试=============
    // var object = new Events();

    // var callback_handler = function() { alert('expand_click'); }
    // var callback_expand = function() { alert('expand'); }
    // var callback_all = function(e, a) { alert(e + '-' + a); }

    // object.on('expand click', callback_handler);
    // object.on('all', callback_all);
    // object.trigger('expand click', 'all');
    // console.log(object);
    // object.off();
    // object.trigger('expand');


    // this 指向
    // function e() {}
    // e.proto = function(o){
    //     (function() {
    //         // this === Window
    //         console.log(this)
    //         o['key'] = function() {
    //             // this === o
    //             console.log(this === o)
    //         }
    //     })();
    // }
    // var a = {}
    // e.proto(a);
    // a.key();

    // prototype 复制时，this默认会指向新的对象。
    // 如果要指向原对象，需要通过 function(){o1['proto1'].apply(o1, Array.prototype.slice.call(arguments))} 实现

    // function aa(){}
    // aa.prototype.showThis = function() {console.log(this);};
    // function bb(){}
    // // this 指向 bb
    // bb.prototype['showThis'] = aa.prototype['showThis'];
    // // this 指向 aa
    // bb.prototype['showThis'] = function() {
    //     aa.prototype['showThis'].apply((new aa), Array.prototype.slice.call(arguments));
    // }
    // var obb = new bb
    // obb.showThis();   // (new bb).showThis() 会报错