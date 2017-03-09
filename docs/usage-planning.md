# usage planning


```js
var Config = require('maf-config');


var config = new Config();

config
    .use(require('maf-config-from-http-json'))
    .from('http://some.domain/url')
    .from('https://some.domain/url')

    // TODO: change maf-config API
    .from({type: 'http-json', sourcepath: '/api/v1/config'})

    .init()
    .then(() => {
        config.get('some.config.param');
    })
    .catch((error) => {
        //
    });

```
