/* https://blog.csdn.net/u012733501/article/details/106858603/ */
const view = require('./plop-templates/view/plop.js');
module.exports = function(plop) {
  plop.setGenerator('view', view);
};
