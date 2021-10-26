window.jQuery = window.$ = require('jquery');

require('bootstrap');
window.Popper = require('popper.js').default;

window.moment = require('moment');

require("es6-shim/es6-shim.min.js");

window.FormValidation = require("../plugins/formvalidation/dist/js/FormValidation.full.min");
window.FormValidation.plugins.Bootstrap = require("../plugins/formvalidation/dist/js/plugins/Bootstrap.js");

import select2 from 'select2';
select2($)