'use strict';

var home = {
  init: function() {
    window.addEventListener('click', this.collapseNav);
  },
  collapseNav: function() {
    $('#navbar').collapse('hide');
  }
};

window.addEventListener('load', home.init.bind(home));