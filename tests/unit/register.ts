const { registerSuite } = intern.getInterface('object');
const { assert } = intern.getPlugin('chai');
import register from './../../src/register';
import * as sinon from 'sinon';

let sandbox: sinon.SinonSandbox;

registerSuite('register', {
	beforeEach() {
		sandbox = sinon.sandbox.create();
	},
	afterEach() {
		sandbox.restore();
	},

	tests: {
		'Should add a yargs option for name'() {
			const options = sandbox.stub();
			register(options);
			assert.isTrue(options.calledOnce);
			assert.isTrue(options.firstCall.calledWithMatch('n', { alias: 'name' }));
		},
		'Should demand the name option'() {
			const options = sandbox.stub();
			register(options);
			assert.isTrue(options.firstCall.calledWithMatch('n', { demand: true }));
		},
		'Should require a value for the name option'() {
			const options = sandbox.stub();
			register(options);
			assert.isTrue(options.firstCall.calledWithMatch('n', { requiresArg: true }));
		}
	}
});
