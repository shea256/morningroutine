/*****************************************
*                Views
*****************************************/

$(document).ready(function() {
	window.HomeView = Backbone.View.extend({
		template: _.template($('#home-template').html()),
		initialize: function() {
		},
		render: function() {
			this.$el.html(this.template());
			return this;
		}
	});

	window.EditorView = Backbone.View.extend({
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

	window.RoutineView = Backbone.View.extend({
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
		},
		addOne: function(model) {
			console.log(model);
			var fullscreenItemView = new FullscreenItemView({ model: model });
			fullscreenItemView.render();
			this.$el.append(fullscreenItemView.el);
		}
	});

	window.ItemView = Backbone.View.extend({
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

	window.ItemListView = Backbone.View.extend({
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
});

