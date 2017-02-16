
define(function(require, exports, module) {

    function Class(o) {
        // 在没用使用new，且o为函数的情况下调用
        if(!(this instanceof Class) && isFunction(o)) {
            return classify(o)
        }
    }
    // 继承非Class父类静态属性，不继承实例属性
    Class.create = function(parent, properties) {
        if(!isFunction(parent)) {
            properties = parent;
            parent = null;
        }
        properties || (properties = {});
        parent || (parent = properties.Extends || Class);

        function SubClass() {
            // 继承父类的构造函数
            parent.apply(this, arguments);
            // new SubClass() 的情况下，调用 initialize 方法
            if(this.constructor === SubClass && this.initialize) {
                this.initialize.apply(this, arguments);
            }
        }
        // 将父类的静态属性合并到SubClass中。如果父类有设置白名单，只能继承白名单中的静态属性
        if(parent !== Class) {
            mix(SubClass, parent, parent.StaticWhiteList);
        }
        // 对SubClass添加原型属性
        implement.call(SubClass, properties);

        return classify(SubClass);
    };

    // 继承自 Class ，但不继承静态方法。扩展实例属性
    Class.extend = function(properties) {
        properties || (properties = {});
        properties.Extends = this;

        return Class.create(properties);
    };
    // 用于implement实例属性继承中，对以下属性直接执行方法
    Class.Mutators = {
        // prototype 继承
        Extends: function(parent) {
            var existed = this.prototype;
            var proto = createProto(parent.prototype);

            // 合并 父类和子类 的prototype, 返回原型链
            // fatherClass {}
            //     getAddr: function()
            //     __proto__:Object
            //         constructor:fatherClass()
            //         getName:function()
            //         __proto__:Object
            mix(proto, existed);

            proto.constructor = this;
            this.prototype =  proto;
            this.superclass = parent.prototype;
        },
        // 扩展实例属性
        // items参数  
        // [{
        //     prototype: {
        //         proto1: ...
        //     }
        // }]
        // 或
        // {
        //     proto1: ...
        // }
        Implements: function(items) {
            isArray(items) || (items = [items]);
            var proto = this.prototype, item;

            while(item = items.shift()) {
                mix(proto, item.prototype || item);
            }
        },
        //扩展静态属性
        Statics: function(staticsProperties) {
            mix(this, staticsProperties);
        }
    }
    function implement(properties) {
        var key, value;
        for(key in properties) {
            value = properties[key];
            // properties中含有 Class.Mutators 包含的特殊设置类属性，
            // 直接调用 Class.Mutators 中的方法执行
            if(Class.Mutators.hasOwnProperty(key)) {
                Class.Mutators[key].call(this, value);
            } else {
                this.prototype[key] = value;
            }
        }
    }

    // 通过 构造函数 创建Class类，包含两个属性：extend 用于继承Class，implement 用于属性扩展。
    function classify(cls) {
        cls.extend = Class.extend;  // 用于继承并返回新的对象
        cls.implement = implement;  // 用于扩展自身对象

        return cls;
    }
    // fatherClass {} 或 Ctor {}
    //     __proto__:Object
    //         constructor:fatherClass()
    //         getName:function()
    //         __proto__:Object
    var createProto = Object.__proto__ ? 
        function(proto) {
            return {__proto__: proto};
        } : 
        function(proto) {
            function Ctor() {}
            Ctor.prototype = proto;
            return new Ctor;
        }

    // Helpers
    // ------------
    function mix(r, s, wl) {
        for(var p in s) {
            if(s.hasOwnProperty(p)) {
                // 白名单中不存在该属性的话，跳过不赋值
                if(wl && wl.indexOf(p) == -1) continue;

                if(p !== 'prototype') {
                    r[p] = s[p];
                }
            }
        }
    }
    function isFunction(val) {
        return Object.prototype.toString.call(val) === '[object Function]';
    }
    function isArray(val) {
        return Object.prototype.toString.call(val) === '[object Array]';
    }

    if(typeof Array.prototype.indexOf != 'function') {
        Array.prototype.indexOf = function(searchItem, startIndex) {
            var index = -1,
                startIndex = parseInt(startIndex * 1) || 0;

            for(var i = startIndex, len = this.length; i < len; i++) {
                if(this[i] === searchItem) {
                    index = i;
                    break;
                }
            }
            return index;
        }
    }

    return Class;
})
