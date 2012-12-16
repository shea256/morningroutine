define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {

	var ItemView = Backbone.View.extend({
		tagName: 'tr',
		className: 'listed-item',
		template: _.template($('#listed-item-template').html()),
		initialize: function() {
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		},
		events: {
			"dblclick"               : "edit",
			"click .save"            : "save",
			"keypress .contentInput" : "updateOnEnter",
			"click .delete"          : "clear"
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.typeInput = this.$('.typeInput');
			this.contentInput = this.$('.contentInput');
			return this;
		},
		edit: function() {
			this.$el.addClass('editing');
		},
		save: function() {
			this.$el.removeClass('editing');
			var content = this.contentInput.val();
			var type = this.typeInput.val();
			this.model.set({ 'content': content, 'type': type });
			this.model.save();
		},
		cancel: function() {
			this.$el.removeClass('editing');
		},
		updateOnEnter: function(e) {
			if (e.keyCode == 13) this.model.save();
		},
		clear: function() {
			this.model.destroy();
		}
	});

	return ItemView;

});