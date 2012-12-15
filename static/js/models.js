/*****************************************
*                Models
*****************************************/

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

var ItemList = Backbone.Collection.extend({
	model: Item,
	url: '/api/items'
});