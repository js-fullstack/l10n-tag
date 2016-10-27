const debug = require('debug')('l10n-tag');

module.exports = (l10nMap) => {
    return (inputs, ...values) => {
        const key = inputs.slice(1).reduce((pre, curr, index) => `${pre}\${${index}}${curr}`, inputs[0]);
        if(!l10nMap[key]) {
            debug(`cannot found key: ${key} from l10n resource map`);
        }
        const template = l10nMap[key] || key;
        return template.replace(/\$\{(\d+)\}/g, (_,index) => values[index]);
    }
}