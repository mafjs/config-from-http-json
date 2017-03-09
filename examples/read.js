var Config = require('maf-config');

var jsonPlugin = require('../package/JsonPlugin');

var logger = require('log4js-nested').getLogger();

var config = new Config(logger);

config
    .use(jsonPlugin)
    .from('https://rawgit.com/mafjs/config/master/package.json', '.')
    .init()
    .then(() => {
        logger.info(config.isValid());
        logger.info(config.get('.'));
    })
    .catch((error) => {
        logger.error(error);
    });
