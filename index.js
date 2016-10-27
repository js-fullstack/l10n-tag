const debug = require('debug')('l10n-tag');
const escape = require("escape-regexp");
const REGEXP = /\$\{(\d+)\}/g;
const PREFIX = '${';
const SURFFIX = '}';

function missingkey(key, inputs, values) {
    debug(`cannot found key: ${key} from l10n resource map.`);
}

module.exports = (l10nMap = {},options = {}) => {
    let cb = options.cb || missingkey;
    let regexp = new RegExp(`${escape(options.prefix || PREFIX)}(\\d+)${escape(options.surffix || SURFFIX)}`, 'g');
    debug('capture regexp',regexp.source);
    return (inputs, ...values) => {
        const key = inputs.slice(1).reduce((pre, curr, index) => `${pre}\${${index}}${curr}`, inputs[0]);
        if(!l10nMap[key]) {
            cb(key, inputs, values);
        }
        const template = l10nMap[key] || key;
        return template.replace(regexp, (_,index) => values[index]);
    }
}
