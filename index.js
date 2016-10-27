const debug = require('debug')('l10n-tag');
const REGEXP = /\$\{(\d+)\}/g;

module.exports = (l10nMap, output=debug) => {
    return (inputs, ...values) => {
        const key = inputs.slice(1).reduce((pre, curr, index) => `${pre}\${${index}}${curr}`, inputs[0]);
        if(!l10nMap[key]) {
            output(`cannot found key: ${key} from l10n resource map.`);
        }
        const template = l10nMap[key] || key;
        return template.replace(REGEXP, (_,index) => values[index]);
    }
}
