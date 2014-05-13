var Mocha = require('mocha');
var createRunner = require('scribe-test-harness/create-runner');

var mocha = new Mocha();

/**
 * FIXME: We have to set a ridiculous timeout (20 minutes) because Travis’
 * concurrent builds will sometimes exceed Sauce Labs’ concurrency. We should
 * track the following issue to add an option to Travis for limiting
 * concurrency: https://github.com/travis-ci/travis-ci/issues/1366
 */
mocha.timeout(1200000);
mocha.reporter('spec');
mocha.addFile(__dirname + '/main.spec.js');

createRunner(mocha);
