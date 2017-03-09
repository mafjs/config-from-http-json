var request = require('superagent');

var JsonPluginError = require('../Error');

module.exports = function (sourcepath) {
    return new Promise((resolve, reject) => {

        request.get(sourcepath)
            .end(function (error, res) {

                if (error) {
                    return reject(
                        JsonPluginError.createError(JsonPluginError.CODES.CANT_READ_SOURCE, error)
                            .bind({
                                sourcepath: sourcepath
                            })
                    );
                }

                resolve(res.body);
            });

    });
};
