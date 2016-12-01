(function() {
	var config = {
		base: './src/',
		alias: {
			'jquery'  : 'build/jquery-1.11.2',
			'react'   : 'build/react',
			'reactDom': 'build/react-dom',
			'reflux'  : 'build/reflux',
			'init'	  : 'main',
            'promise' : 'common/promise'
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
