//# A Carousel Widget using Ember.Component and Ember.CollectionView compatible with Ember.js. To insert a carousel
//# {{credi-carousel carouselId='myCarousel' carouselImages={Array of Image URLs to display} interval:5000 }}
//# {{/credi-carousel}}
//# carouselId : takes in the unique id of your carousel
//# carouselImages : should be an array of image urls
//# interval : the cycling interval for the carousel
//
//# By default the first item is active.
//
//# TODOs
//# 1. Change default active item.
//# 2. Change indicator positions.
//
//
//# Dependencies -> jquery-1.9.1.js, handlebars-1.0.0.js, ember-1.1.2.js, bootstrap.js.




// The indicators are created using Ember CollectionViews. By default the first image is the active image so first indicator
// is the active indicator.
App.InactiveIndicatorView = Ember.View.extend({
	attributeBindings: ['dataTarget:data-target', 'dataSlideTo:data-slide-to']
}, {
	tagName: 'li',
	dataTarget: (function() {
		return "#" + this.get('parentView').get('carouselId').toString();
	}).property('parentView.carouselId'),
	dataSlideTo: (function() {
		return this.get('content');
	}).property('content'),
	template: Ember.Handlebars.compile("")
});

App.ActiveIndicatorView = App.InactiveIndicatorView.extend({
	classNames: ['active']
});


// The Carousel Item View. The template property can be changed to whatever you want to be diplayed inside the carousel. You
// can add html there.
App.InactiveCarouselItemView = Ember.View.extend({
	classNames: ['item'],
	template: Ember.Handlebars.compile("<img {{bindAttr src='view.content'}}>")
});

App.ActiveCarouselItemView = App.InactiveCarouselItemView.extend({
	classNames: ['item', 'active']
});

App.CarouselIndicatorsView = Ember.CollectionView.extend({
	tagName: 'ol',
	classNames: ['carousel-indicators'],
	carouselId: undefined,
	content: undefined,
	indicatorClass: undefined,
	createChildView: function(viewClass, attrs) {
		if (attrs.content === 0) {
			viewClass = App.ActiveIndicatorView;
		} else {
			viewClass = App.InactiveIndicatorView;
		}
		return this._super(viewClass, attrs);
	}
});

App.CarouselInnerView = Ember.CollectionView.extend({
	content: undefined,
	classNames: ['carousel-inner'],
	createChildView: function(viewClass, attrs) {
		if (this.get('content').indexOf(attrs.content) === 0) {
			viewClass = App.ActiveCarouselItemView;
		} else {
			viewClass = App.InactiveCarouselItemView;
		}
		return this._super(viewClass, attrs);
	}
});

App.EmberCarouselComponent = Ember.Component.extend({
	carouselId: undefined,
	carouselImages: [],
	interval: 5000,
	showCarouselNavs: true,
	showIndicators: true,
	didInsertElement: function() {
		var str;
		str = "#" + this.get('carouselId');
		return $(str).carousel({
			interval: parseInt(this.get('interval'))
		});
	},
	target: (function() {
		return "#" + this.get('carouselId').toString();
	}).property('carouselId'),
	indicators: (function() {
		var arr, i;
		arr = [];
		i = 0;
		if (!Ember.isEmpty(this.get('carouselImages'))) {
			while (i < this.get('carouselImages').get('length')) {
				arr.pushObject(i++);
			}
		}
		return arr;
	}).property('carouselImages'),
	showSingle: (function() {
		if (!Ember.isEmpty(this.get('carouselImages')) && this.get('carouselImages').get('length') === 1) {
			return true;
		} else if (!Ember.isEmpty(this.get('carouselImages')) && this.get('carouselImages').get('length') > 1) {
			return false;
		}
	}).property('carouselImages'),
	noImages: (function() {
		if (Ember.isEmpty(this.get('carouselImages'))) {
			return true;
		}
	}).property('carouselImages')
});
