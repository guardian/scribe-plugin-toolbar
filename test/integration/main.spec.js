var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

var helpers = require('scribe-test-harness/helpers');
helpers.registerChai(chai);
var when = helpers.when;
var initializeScribe = helpers.initializeScribe.bind(null, 'scribe');

// Get new referenceS each time a new instance is created
var driver;
before(function () {
  driver = helpers.driver;
});

var scribeNode;
beforeEach(function () {
  scribeNode = helpers.scribeNode;
});


describe('toolbar plugin', function () {
  beforeEach(function () {
    return initializeScribe();
  });

  beforeEach(function () {
    return driver.executeAsyncScript(function (done) {
      var body = window.document.querySelector('body');
      // Create toolbar
      var toolbarDiv = window.document.createElement('div');
      toolbarDiv.className = 'scribe-toolbarDiv';

      // Create one default button
      var defaultButton = window.document.createElement('button');
      defaultButton.setAttribute('data-command-name', 'removeFormat');
      defaultButton.innerText = 'Remove Format';

      // Create a vendor button
      var vendorButton = window.document.createElement('button');
      vendorButton.innerText = 'Leave vendor alone!';

      // Add them to the DOM
      toolbarDiv.appendChild(defaultButton);
      toolbarDiv.appendChild(vendorButton);
      body.appendChild(toolbarDiv);

      require(['../../src/scribe-plugin-toolbar'], function (toolbarPlugin) {
        window.scribe.use(toolbarPlugin(toolbarDiv));
        done();
      });
    });
  });

  when('updating the toolbar ui', function () {
    it('should disable toolbar buttons', function (done) {
      driver.executeScript(function () {
        return window.document.querySelector('.scribe-toolbarDiv button[data-command-name]');
      }).then(function (button) {
        expect(button.getAttribute('disabled')).to.be.eventually.ok.notify(done);
      });
    });

    it('should not disable vendor buttons', function (done) {
      driver.executeScript(function () {
        return window.document.querySelector('.scribe-toolbarDiv button:not([data-command-name])');
      }).then(function (button) {
        expect(button.getAttribute('disabled')).not.to.be.eventually.ok.notify(done);
      });
    });
  });
});
