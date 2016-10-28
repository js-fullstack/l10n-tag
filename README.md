# l10n-tag

tagged template based on es6. Inspired by [i18n-tag](https://github.com/chicoxyzzy/i18n-tag).

## Sample

res_en.json:
```
{
    "HELLO ${0}, ${1}.": "hello ${0}! the content is '${1}'."
}

```

main.js:
```
const l10nTag = require('l10n-tag');
const en = require('res_en.json');

const l10n = l10nTag(en);

let name = 'foo';
let content = 'test template string';

let message = l10n`HELLO ${name}, ${content}.`;

console.log(message); // "hello foo! the content is 'test template string'." will be output.

```

## Options

`options` can be used when create l10n.

```
...
const l10n = l10nTag(en, options);
```

#### options.cb

`options.cb` is callback, it will be called if l10n cannot found key, default behavior is output error by debug.
```
const log = ...;
const l10n = l10nTag(en, (cb(key, inputs, values) => log.warn(`${key} was missing.`)));
```

#### options.prefix, options.surffix
`options.prefix` and `options.surffix` can be used when need define prefix and surffix of template key, default value is `${` and `}`.

res2_en.json:
```
{
    "HELLO {0}, {1}.": "hello {0}! the content is '{1}'."
}

```

main.js:
```
const l10nTag = require('l10n-tag');
const en = require('res2_en.json');
const l10n = l10nTag(en, {prefix:'{', surfix:'}'});
```

## Important

Only support ES6+



