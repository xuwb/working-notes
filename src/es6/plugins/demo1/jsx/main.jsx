"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	return class myWidget extends require('plugins/myReflux/widget') {
		getComponent(){
			return require('./index');
		}
	};

});