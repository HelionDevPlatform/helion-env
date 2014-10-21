var BaseRes = require('./base_res')
  , _ = require('underscore');

var AppRes = module.exports = BaseRes.extend({
  route: function (app) {

    app.get('/', _.bind(this.getEnvironmentVariables, this));

  },

  getEnvironmentVariables: function (req, res) {
    var variablesToShow = [
    'SSH_CLIENT',
    'PACKAGES_COMMON',
    'LC_ALL',
    'VCAP_APP_PORT',
    'LANG',
    'VCAP_SERVICES',
    'SSH_CONNECTION',
    'PORT',
    'MEMORY_LIMIT'
    ],
    vars = [];

    _.each(variablesToShow, function (variable) {
        if(process.env[variable]) {
            vars.push({
              name : variable,
              value : process.env[variable]
            });
        }
    });

    res.render("app/index", {vars: vars});
  }
});
