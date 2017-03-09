'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JsonPluginError = require('./Error');

var _read = require('./methods/read');

var FromHttpJsonPlugin = function () {

    /**
     * @param {?Logger} logger
     */
    function FromHttpJsonPlugin(logger) {
        _classCallCheck(this, FromHttpJsonPlugin);

        this.type = 'receive';
        this.name = 'maf-config-from-http-json';

        this.Error = JsonPluginError;
        this._logger = this._validateLogger(logger);

        this._options = {};
    }

    /**
     * init
     * @param {?Object} options
     */


    _createClass(FromHttpJsonPlugin, [{
        key: 'init',
        value: function init(options) {
            if (options) {
                this._options = options;
            }
        }

        /**
         * @param {String} sourcepath
         * @return {Boolean}
         */

    }, {
        key: 'isMatch',
        value: function isMatch(sourcepath) {
            return (/^https?:\/\//.test(sourcepath)
            );
        }

        /**
         * read json file
         *
         * @param {String} sourcepath
         * @return {Promise}
         */

    }, {
        key: 'read',
        value: function read(sourcepath) {

            return new Promise(function (resolve, reject) {

                _read(sourcepath)
                // .then(() => {
                //     return read(sourcepath);
                // })
                // .then((data) => {
                //     return parse(sourcepath, data);
                // })
                .then(function (obj) {
                    resolve(obj);
                }).catch(function (error) {
                    reject(error);
                });
            });
        }

        /**
         * @private
         * @param {String} code
         * @param {Error} error
         * @return {JsonPluginError}
         */

    }, {
        key: '_createError',
        value: function _createError(code, error) {
            return this.Error.createError(code, error);
        }

        /**
         * validate logger
         *
         * @private
         * @param {?Logger} logger
         * @return {Logger|Null}
         */

    }, {
        key: '_validateLogger',
        value: function _validateLogger(logger) {
            if (!logger) {
                return null;
            }

            if (typeof logger.debug !== 'function') {
                throw this._createError(JsonPluginError.CODES.INVALID_LOGGER);
            }

            return logger;
        }

        /* istanbul ignore next */
        /**
         * @private
         */

    }, {
        key: '_debug',
        value: function _debug() {
            if (this._logger && this._logger.debug && typeof this._logger.debug === 'function') {
                this._logger.debug.apply(this._logger, arguments);
            }
        }
    }]);

    return FromHttpJsonPlugin;
}();

module.exports = FromHttpJsonPlugin;