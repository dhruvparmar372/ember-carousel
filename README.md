ember-carousel
==============

A ReUsable Carousel Component for Ember Js

A Carousel Widget using Ember.Component and Ember.CollectionView compatible with Ember.js. To insert a carousel
{{credi-carousel carouselId='myCarousel' carouselImages={Array of Image URLs to display} interval:5000 }}
{{/credi-carousel}}
carouselId : takes in the unique id of your carousel
carouselImages : should be an array of image urls
interval : the cycling interval for the carousel

By default the first item is active.

TODOs
1. Change default active item.
2. Change indicator positions.


Dependencies -> jquery-1.9.1.js, handlebars-1.0.0.js, ember-1.1.2.js, bootstrap.js.
