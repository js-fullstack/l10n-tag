const l10nTag  = require("./index");
const assert = require("assert");

describe('',()=>{
    it('happy path', () => {
        const l10n = l10nTag({
            "HELLO ${0}, ${1}.": "hello ${0}! the content is '${1}'."
        });

        let name = 'foo';
        let content = 'test template string';

        let result = l10n`HELLO ${name}, ${content}.`;
        assert.equal(result,"hello foo! the content is 'test template string'.");
    })
});