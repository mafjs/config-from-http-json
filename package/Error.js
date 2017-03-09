'use strict';

var HttpJsonPluginError = require('maf-error').create('HttpJsonPluginError', {
    INVALID_LOGGER: 'maf-config-from-http-json: no logger.debug method passed in constructor',
    NOT_EXISTS: 'maf-config-from-http-json: %sourcepath% not exists',
    INVALID_JSON: 'maf-config-from-http-json: invalid json in %sourcepath%',
    CANT_READ_SOURCE: 'maf-config-from-http-json: cant read source = %sourcepath%'
});

module.exports = HttpJsonPluginError;