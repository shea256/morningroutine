define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {

	var EditorView = Backbone.View.extend({
		template: _.template($('#editor-template').html()),
		initialize: function() {
		},
		events: {
			'click .createItem' : 'createItem'
		},
		render: function() {
			this.$el.html(this.template());
			this.typeInput = this.$('.typeInput');
			this.contentInput = this.$('.contentInput');
			return this;
		},
		createItem: function() {
			var type = this.typeInput.val();
			var content = this.contentInput.val();
			var author = 'anonymous';
			this.collection.create({ type: type, content: content, author: author });
			this.contentInput.val('');
		},
	});

	return EditorView;
	
});

