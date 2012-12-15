/*****************************************
*              Controllers
*****************************************/

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
		$('#app').html(homeView.el);
	},
	editRoutine: function() {
		var editorView = new EditorView({ collection: this.itemList });
		editorView.render();
		$('#app').html(editorView.el);

		var itemListView = new ItemListView({ collection: this.itemList });
		itemListView.render();
		$('#item-table').append(itemListView.el);
		this.itemList.fetch();
	},
	viewRoutine: function() {
		var routineView = new RoutineView({ collection: this.itemList });
		$('#app').html(routineView.el);
		this.itemList.fetch();
	},
	start: function() {
		Backbone.history.start({pushState: true});
	}
});