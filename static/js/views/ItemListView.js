define([
	'jquery',
	'underscore',
	'backbone',
	'views/ItemView',
], function($, _, Backbone, ItemView) {

	var ItemListView = Backbone.View.extend({
		tagName: 'tbody',
		initialize: function() {
			this.collection.on('add', this.addOne, this);
			this.collection.on('reset', this.render, this);
		},
		render: function() {
			this.collection.forEach(this.addOne, this);
		},
		addOne: function(model) {
			var itemView = new ItemView({ model: model });
			itemView.render();
			this.$el.append(itemView.el);
		}
	});

	return ItemListView;

});