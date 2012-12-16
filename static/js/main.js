require.config({
	paths: {
		jquery: 'libs/jquery.min',
		underscore: 'libs/underscore-amdjs',
		backbone: 'libs/backbone-amdjs',
		bootstrap: 'libs/bootstrap.min'
	}
});

require([
	'app',
], function(App) {
	App.initialize();
});