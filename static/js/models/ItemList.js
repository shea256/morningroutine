define([
	'jquery',
	'underscore',
	'backbone',
	'../models/Item',
], function($, _, Backbone, Item) {

	var ItemList = Backbone.Collection.extend({
		model: Item,
		url: '/api/items'
	});

	return ItemList;

});