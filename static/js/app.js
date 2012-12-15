/*****************************************
*               Run App
*****************************************/

require([
	"/static/js/jquery.min.js",
	"/static/js/underscore.min.js",
	"/static/js/backbone.min.js",
	"/static/js/bootstrap.min.js",
	"/static/js/models.js",
	"/static/js/views.js",
	"/static/js/controllers.js"
	],
	function() {
		$(function(){
			window.appRouter = new AppRouter();
			appRouter.start()
		});
	}
);