// Aspect
// ---------------------
// Thanks to:
//  - http://yuilibrary.com/yui/docs/api/classes/Do.html
//  - http://code.google.com/p/jquery-aop/
//  - http://lazutkin.com/blog/2008/may/18/aop-aspect-javascript-dojo/

define(function(require, exports, module) {

  // 在指定方法执行前，先执行 callback
  exports.before = function(methodName, callback, context) {
    return weave.call(this, 'before', methodName, callback, context);
  };


  // 在指定方法执行后，再执行 callback
  exports.after = function(methodName, callback, context) {
    return weave.call(this, 'after', methodName, callback, context);
  };


  // Helpers
  // -------

  var eventSplitter = /\s+/;

  function weave(when, methodName, callback, context) {
    var names = methodName.split(eventSplitter);
    var name, method;

    while (name = names.shift()) {
      // 主要在继承中使用，若this中含有该方法，则侦听该方法
      method = getMethod(this, name);
      if (!method.__isAspected) {
        wrap.call(this, name);
      }
      // 继承了events的对象，侦听自定义事件
      this.on(when + ':' + name, callback, context);
    }

    return this;
  }

  // 获取当前对象上的方法
  function getMethod(host, methodName) {
    var method = host[methodName];
    if (!method) {
      throw new Error('Invalid method name: ' + methodName);
    }
    return method;
  }


  function wrap(methodName) {
    var old = this[methodName];

    // 重新包装this[methodName]，在调用 this[methodName] 时，自动调用before、after方法。
    this[methodName] = function() {
      var args = Array.prototype.slice.call(arguments);

      // 执行 before 方法，如果返回false则停止执行
      var beforeArgs = ['before:' + methodName].concat(args);

      // prevent if trigger return false
      if (this.trigger.apply(this, beforeArgs) === false) return;

      // 执行对象上的 this[methodName] 方法
      var ret = old.apply(this, arguments);

      // 执行 after 方法，将this[methodName] 方法的返回值作为参数传入
      var afterArgs = ['after:' + methodName, ret].concat(args);
      this.trigger.apply(this, afterArgs);

      return ret;
    };

    this[methodName].__isAspected = true;
  }
})
