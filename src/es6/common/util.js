'use strict';

define(function(require, exports, module) {
	var limit = require('./limit2.0');

	//变量
	var util = {},
		arrPro = Array.prototype,
		slice = arrPro.slice;

	//空函数
	var K = util.K = function(k){return k};

	//空对象
	var O = util.O = {};

	//格式化日期
	var formatDateRex = /^(yyyy)(.MM)?(.dd)?(.HH)?(.mm)?(.ss)?$/,
		formatDateFoo = ['getFullYear', 'getMonth', 'getDate', 'getHours', 'getMinutes', 'getSeconds'];

	//函数:增加0
	function formatDateAddZero(val){
		return ('00' + val).slice(-2);
	}

	module.exports = {
		//可能是函数
		maybeCallback: function(foo, defaultFoo) {
			return typeof foo === 'function' ? foo : defaultFoo || K;
		},
		//控制台
		log: function(){
			var args = slice.call(arguments),
				type = args.shift(),
				console = window.console || O,
				log;
			//对type的处理可选值 error[默认] log warn
			if(type !== 'error' && type !== 'log' && type !== 'warn'){
				args.unshift(type);
				type = 'error'
			}
			log = console[type] || K;
			args.unshift('这不是错误:');
			//IE10下的IE8调试模式，console.log 是个对象
			try{
				log.apply(console, args);
			}catch(e){
				log('这不是错误:', args[1], args[2]);
			};
		},
		//遍历对象
		breakEachObj: function(obj, callback, context){
			for(var i in obj){
				if(obj.hasOwnProperty(i)){
					if(callback.call(context, obj[i], i, obj)){
						break;  
					}
				}
			}
		},
		//遍历数组
		breakEachArr: function(arr, callback, context){
			var index = 0,
				length = arr.length;
			for(; index < length; index++){
				if(callback.call(context, arr[index], index, arr)){
					break;
				}
			}
		},
		//数组的indexOf
		indexOfArr: function(arr, target){
			var rtv = -1;
			this.breakEachArr(arr, function(val, index){
				if(val === target){
					rtv = index;
					return true;
				}
			});
			return rtv;
		},
		//解析数组
		setArray: function(obj){
			return slice.call(obj, 0);
		},
		formatDate: function(format, timestamp){
			var date = arguments.length === 1 ? new Date(): new Date(timestamp);
			if( !isNaN(+date) ){
				return format.replace(formatDateRex, function(){
					var index = 0,
						val,
						obj,
						arr = [];
					while(obj = arguments[++index]){
						if(!obj){
							break;
						}
						val = date[formatDateFoo[index - 1]]();
						//年份的处理
						if(index === 1){
							arr.push(''+val);
						}else{
							//月份的处理
							index === 2 && val++;
							arr.push(obj.slice(0, 1) + formatDateAddZero(val));
						}
					}
					return arr.join('');
				});
			}else{
				this.log('日期异常。', timestamp)
			}
		},
		//获取url参数
		getUrlParam: function  (name, url) {
		    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		    var search = url || window.location.search.substr(1);
		    var r = search.match(reg);
		    return r ? r[2] : null
		},
		//formatMoney
	    formatMoney: function(NUM, MED){
	       var REX = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
	       return (+NUM).toFixed(~~MED).replace(REX, '$1,');
	    },
		// obj:      时间字符串
		// showTime: 是否显示时分秒
		// IsMi:     是否显示毫秒
		formatDateTime: function(obj, showTime, IsMi) {   
	        var myDate = new Date(obj);   
	        var year = myDate.getFullYear();  
	        var month = ("0" + (myDate.getMonth() + 1)).slice(-2);  
	        var day = ("0" + myDate.getDate()).slice(-2);  
	        var h = ("0" + myDate.getHours()).slice(-2);  
	        var m = ("0" + myDate.getMinutes()).slice(-2);  
	        var s = ("0" + myDate.getSeconds()).slice(-2);   
	        var mi = ("00" + myDate.getMilliseconds()).slice(-3);  
	        if(!showTime) {
	        	return year + "-" + month + "-" + day;
	        }
	        if (IsMi) {   
	            return year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s;   
	        }   
	        else {   
	            return year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s + "." + mi;   
	        }
	    },
	    // 返回 max 和 mix 之间的随机数
	    randomBy: function(max, mix) {
	    	var result = 0;
	    	switch(arguments.length) {
	    		case 1: 
	    			result = parseInt(Math.random() * max + 1);
	    			break;
	    		case 2: 
	    			result = parseInt(Math.random() * (max - mix + 1) + mix);
	    			break;
	    	}
	    	return result;
	    },
	    randomStr: function(len) {
	        var str = '';
	        for(var i = 0; i < len; i++) {
	            str += this.randomBy(10, 0);
	        }
	        return str;
	    },
	    objectSize: function(obj) {
	    	var t = typeof obj;
	    	if(t == 'string') return obj.length;
	    	else if(t == 'object') {
	    		var count = 0;
	    		for(var val in obj) {
	    			count++;
	    		}
	    		return count;
	    	}
	    	return false;
	    },
	    fetch: function(url) {
	    	var promise = new limit.promise(function(resolve, reject) {
	    		$.ajax({
	    			url: url,
	    			type: 'get',
	    			dataType: 'json',
	    			success: resolve,
	    			error: reject
	    		});
	    	});
	    	return promise;
	    }
	}
})