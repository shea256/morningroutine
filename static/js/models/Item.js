define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {

	var Item = Backbone.Model.extend({
		urlRoot: '/api/item',
		defaults: function() {
			return {
				type: 'quote',
				content: '',
				author: 'anonymous'
			}
		}
	});

	return Item;

});