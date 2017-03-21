var JsonPluginError = require('./Error');

var read = require('./methods/read');

class FromHttpJsonPlugin {

    /**
     * @param {?Logger} logger
     */
    constructor (logger) {
        this.type = 'receive';
        this.name = 'maf-config-from-http-json';

        this.Error = JsonPluginError;
        this._logger = this._validateLogger(logger);

        this._options = {
            matchAll: false
        };
    }

    /**
     * init
     * @param {?Object} options
     */
    init (options) {
        if (options) {
            this._options = options;
        }
    }

    /**
     * @param {String} sourcepath
     * @return {Boolean}
     */
    isMatch (sourcepath) {
        if (this._options && this._options.matchAll) {
            return true;
        }

        return /^https?:\/\//.test(sourcepath);
    }

    /**
     * read json file
     *
     * @param {String} sourcepath
     * @return {Promise}
     */
    read (sourcepath) {

        return new Promise((resolve, reject) => {

            read(sourcepath)
                // .then(() => {
                //     return read(sourcepath);
                // })
                // .then((data) => {
                //     return parse(sourcepath, data);
                // })
                .then((obj) => {
                    resolve(obj);
                })
                .catch((error) => {
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
    _createError (code, error) {
        return this.Error.createError(code, error);
    }

    /**
     * validate logger
     *
     * @private
     * @param {?Logger} logger
     * @return {Logger|Null}
     */
    _validateLogger (logger) {
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
    _debug () {
        if (
            this._logger &&
            this._logger.debug &&
            typeof this._logger.debug === 'function'
        ) {
            this._logger.debug.apply(this._logger, arguments);
        }
    }
}

module.exports = FromHttpJsonPlugin;
