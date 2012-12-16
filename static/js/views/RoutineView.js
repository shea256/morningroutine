define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {

	var RoutineView = Backbone.View.extend({
		className: 'center',
		template: _.template($('#routine-template').html()),
		initialize: function() {
			this.collection.on('reset', this.render, this);
			this.count = 0;
		},
		events: {
			'click .nextItem': 'nextItem'
		},
		render: function() {
			var model = this.collection.models[this.count];
			this.$el.html(this.template(model.toJSON()));
			return this;
		},
		nextItem: function() {
			this.count += 1;
			if (this.count < this.collection.length) {
				var model = this.collection.models[this.count];
				this.$el.html(this.template(model.toJSON()));
			} else {
				window.appRouter.navigate('', {trigger: true});
			}
		}
	});

	return RoutineView;

});