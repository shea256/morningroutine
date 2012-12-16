define([
	'jquery',
	'underscore',
	'backbone',
	'views/HomeView',
	'views/EditorView',
	'views/RoutineView',
	'views/ItemListView',
	'models/ItemList',
], function($, _, Backbone, HomeView, EditorView, RoutineView, ItemListView, ItemList) {

	var AppRouter = Backbone.Router.extend({
		routes: {
			'': 'home',
			'routine/edit': 'editRoutine',
			'routine': 'viewRoutine'
		},
		initialize: function(options) {
			this.itemList = new ItemList();
		},
		home: function() {
			var homeView = new HomeView();
			homeView.render();
			$('#content').html(homeView.el);
		},
		editRoutine: function() {
			var editorView = new EditorView({ collection: this.itemList });
			editorView.render();
			$('#content').html(editorView.el);

			var itemListView = new ItemListView({ collection: this.itemList });
			itemListView.render();
			$('#item-table').append(itemListView.el);
			this.itemList.fetch();
		},
		viewRoutine: function() {
			var routineView = new RoutineView({ collection: this.itemList });
			$('#content').html(routineView.el);
			this.itemList.fetch();
		},
		start: function() {
			Backbone.history.start({pushState: true});
		}
	});

	var initialize = function() {
		window.appRouter = new AppRouter;
		appRouter.start();
	};

	return {
		initialize: initialize
	};
});