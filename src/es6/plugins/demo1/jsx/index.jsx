"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {
	
	return require('plugins/myReflux/hoc')(require('./view'), require('./controller'));

}); 