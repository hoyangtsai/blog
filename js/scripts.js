'use strict';

var home = {
  init: function() {
    var click = 'touchstart' in window ? 'touchstart' : 'click';
    window.addEventListener(click, this.collapseNav);

    $('.three-slide').on('webkitAnimationEnd', this.handleTransition);
    $('.three-slide').on('animationend', this.handleTransition);

  },
  collapseNav: function(e) {
    e.preventDefault();
    $('#navbar').collapse('hide');
  },
  handleAnimation: function(e) {
    console.log('Animation end');
  }
};

window.addEventListener('load', home.init.bind(home));