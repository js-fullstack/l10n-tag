const debug = require('debug')('l10n-tag');
const escape = require("escape-regexp");
const DEFUALT_OPTIONS = {
    prefix: '${',
    surffix: '}',
    cb(key, inputs, values) {
        debug(`cannot found key: ${key} from l10n resource map.`);
    }
};

module.exports = (l10nMap = {},options = {}) => {
    const {cb, prefix, surffix} = Object.assign({}, DEFUALT_OPTIONS, options);
    const regexp = new RegExp(`${escape(prefix)}(\\d+)${escape(surffix)}`, 'g');
    debug(`prefix: ${prefix}, surffix: ${surffix}, capturer regexp: ${regexp.source}`);
    return (inputs, ...values) => {
        const key = inputs.slice(1).reduce((pre, curr, index) => `${pre}${prefix}${index}${surffix}${curr}`, inputs[0]);
        if(!l10nMap[key]) {
            cb(key, inputs, values);
        }
        const template = l10nMap[key] || key;
        return template.replace(regexp, (_,index) => values[index]);
    };
}
