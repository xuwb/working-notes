"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {
	
	// 依赖
	const Control = require('plugins/myReflux/control');

	class Controller extends Control {
		store = {
			hiddenTel: false
		}
		onHiddenTel(e){
			let me = this,
				store = me.store;
			store.hiddenTel = true;
			me.updateComponent();
			
		}
		onShowTel(){
			let me = this,
				store = me.store;
			store.hiddenTel = false;
			me.updateComponent();
		}
		
	};

	return new Controller();

});