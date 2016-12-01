'use strict';
define(function(require, exports, module) {
    var Reflux    = require('reflux');

    var CrudActions = Reflux.createActions([
        'fetch',
        'dataChange',
        'delete'
    ]);
    return CrudActions;
});
