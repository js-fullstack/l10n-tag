const l10nTag  = require("./index");
const assert = require("assert");
const TraceStep = require('trace-step');

describe('',()=>{
    it('happy path', () => {
        const l10n = l10nTag({
            "HELLO ${0}, ${1}.": "hello ${0}! the content is '${1}'."
        });

        let name = 'foo';
        let content = 'test template string';

        let result = l10n`HELLO ${name}, ${content}.`;
        assert.equal(result,"hello foo! the content is 'test template string'.");
    });

    it('callback', () => {
		const ts = new TraceStep();
		const l10n = l10nTag({
            "HELLO ${0}, ${1}.": "hello ${0}! the content is '${1}'."
        }, {cb(key, inputs, values) {
        	ts.step(1);
        	assert.deepEqual(['TEST 123'],inputs);
        	assert.deepEqual([],values);
        }});
        
        l10n`TEST 123`;

        assert(ts.match(1));     	
    });

    it('prefix and surffix {1}', () => {
		const l10n = l10nTag({
            "HELLO {0}, {1}.": "hello {0}! the content is '{1}'."
        }, {prefix: '{' , surffix: '}'});

        let name = 'foo';
        let content = 'test template string';

        let result = l10n`HELLO ${name}, ${content}.`;
        assert.equal(result,"hello foo! the content is 'test template string'.");
    });

    it('prefix and surffix [2]', () => {
		const l10n = l10nTag({
            "HELLO [0], [1].": "hello [0]! the content is '[1]'."
        }, {prefix: '[' , surffix: ']'});

        let name = 'foo';
        let content = 'test template string';

        let result = l10n`HELLO ${name}, ${content}.`;
        assert.equal(result,"hello foo! the content is 'test template string'.");
    });

    it('prefix and surffix (3)', () => {
		const l10n = l10nTag({
            "HELLO (0), (1).": "hello (0)! the content is '(1)'."
        }, {prefix: '(' , surffix: ')'});

        let name = 'foo';
        let content = 'test template string';

        let result = l10n`HELLO ${name}, ${content}.`;
        assert.equal(result,"hello foo! the content is 'test template string'.");
    });

    it('only prefix $', () => {
		const l10n = l10nTag({
            "HELLO $0, $1.": "hello $0! the content is '$1'."
        }, {prefix: '$' , surffix: ''});

        let name = 'foo';
        let content = 'test template string';

        let result = l10n`HELLO ${name}, ${content}.`;
        assert.equal(result,"hello foo! the content is 'test template string'.");
    });
});