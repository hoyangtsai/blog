'use strict';

var home = {
  init: function() {
    var click = 'touchstart' in window ? 'touchstart' : 'click';
    window.addEventListener(click, this.collapseNav);
  },
  collapseNav: function() {
    $('#navbar').collapse('hide');
  }
};

window.addEventListener('load', home.init.bind(home));