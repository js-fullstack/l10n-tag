const debug = require('debug')('l10n-tag');
const REGEXP = /\$\{(\d+)\}/g;

function missingkey(key, inputs, values) {
    debug(`cannot found key: ${key} from l10n resource map.`);
}

module.exports = (l10nMap = {},options = {}) => {
    let regexp = options.regexp || REGEXP;
    let cb = options.cb || missingkey;
    return (inputs, ...values) => {
        const key = inputs.slice(1).reduce((pre, curr, index) => `${pre}\${${index}}${curr}`, inputs[0]);
        if(!l10nMap[key]) {
            cb(key, inputs, values);
        }
        const template = l10nMap[key] || key;
        return template.replace(regexp, (_,index) => values[index]);
    }
}
