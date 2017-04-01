(function() {
	var config = {
		base: './',
		alias: {
			'jquery'  : 'src/build/jquery-1.11.2',
			'init'	  : 'dist/main'
		},
		debug: true,
		charset: 'utf-8'
	}
	seajs.config(config);

	// 兼容cmd规范
    if (typeof define === 'function') {
        define(function(require, exports, module) {
            module.exports = config;
        });
    }

    return config;
})();
