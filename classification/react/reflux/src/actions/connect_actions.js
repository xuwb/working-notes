'use strict';
define(function(require, exports, module) {
    var Reflux    = require('reflux');

    var CrudActions = Reflux.createActions([
        'add',
        'testTarget'
    ]);
    return CrudActions;
});
