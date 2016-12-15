"use strict";
// 模型与数据 
// 构建对象关系映射 （ORM）
Object.create || (Object.prototype.create = function(prop){
    function Ctor(){}
    Ctor.prototype = prop;
    return (new Ctor);
});
// 生成伪guid
Math.guid = function(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    }).toUpperCase();
};
// 通过Object.create()创建对象
var Model = {
    created: function(){},
    inherited: function(){
        // console.log(arguments[0])
    },
    prototype: {
        init: function(){
            console.log('instance init');
        }
    },
    create: function(){
        var obj = Object.create(this);
        obj.parent = this;  //this 为Model
        obj.prototype = obj.fn = Object.create(this.prototype);
        obj.created();
        this.inherited(obj);
        return obj;
    },
    init: function(){
        var instance = Object.create(this.prototype);
        instance.parent = this;  // this 为create出来的对象
        instance.init.apply(this, arguments);
        return instance;
    },
    extend: function(o){
        $.extend(this, o);
        var extended;
        (extended = o.extended) && extended(o);
    },
    include: function(o){
        $.extend(this.prototype, o);
        var included;
        (included = o.included) && included(o);
    }
}
// 将实例的数据保存到父类的records中，父类通过每个实例的id进行查询
// Model及其create出来的对象属性
Model.extend({
    // records: {},
    // Object.create() 或 new 出来的不同实例调用的是同样的原型。故 Asset.records == User.records
    // 不同于在model中直接定义 records，该方法针对create出来的对象设置records属性，故不会共用同一个原型
    created: function(){
        this.records = {};
    },
    find: function(id){
        var record = this.records[id];
        if(!record) throw('has no result');
        return record;
    }
});

// init出来的实例属性
Model.include({
    hasRecord: false,
    // 创建records
    create: function(){
        this.id || (this.id = Math.guid());
        this.parent.records[this.id] = this.clone();
        this.hasRecord = true;
    },
    update: function(){
        this.parent.records[this.id] = this.clone();
    },
    save: function(){
        this.hasRecord ? this.update() : this.create();
    },
    clone: function(){
        return $.extend({}, this);
    }
});



// 使用 ====================================================
// 复制对象
var Asset = Model.create();

// 实例化对象，拥有Model的prototype属性
var asset = Asset.init();
asset.name = 'jack';
asset.save();
asset.name = 'jack2';
asset.save();
console.log(Asset.find(asset.id).name);

