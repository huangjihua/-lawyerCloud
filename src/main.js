// With proper loader configuration you can load,
// pre-process and insert css directly with require().
// See webpack.config.js for details.
require('./main.styl')

var Vue = require('vue')
//var VueRouter = require('vue-router');
var app = new Vue({
  el: '#app',
  data: {
    view: 'page-a'
  },
  components: {
    // define the main pages as async components.
    'page-a': function (resolve) {
      require(['./views/a'], resolve) //AMD异步加载模块
    },
    'page-b': function (resolve) {
      require(['./views/b'], resolve)
    }
  }
})

/**
 * Some really crude routing logic here, just for
 * demonstration purposes. The key thing to note here is
 * that we are simply changing the view of the root app -
 * Vue's async components and Webpack's code splitting will
 * automatically handle all the lazy loading for us.
 */

function route () {
  app.view = window.location.hash.slice(1) || 'page-a'
}
 //以下两个listener 位置倒了容易造成找不到 vue模版里的el
window.addEventListener('load', route)
window.addEventListener('hashchange', route)
