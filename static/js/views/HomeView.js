define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {

	var HomeView = Backbone.View.extend({
		template: _.template($('#home-template').html()),
		initialize: function() {
		},
		render: function() {
			this.$el.html(this.template());
			return this;
		}
	});

	return HomeView;
	
});