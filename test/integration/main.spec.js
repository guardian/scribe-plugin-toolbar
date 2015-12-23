var chai = require('chai');
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

      // Create buttons with command value
      var fontButtonImpact = window.document.createElement('button');
      fontButtonImpact.setAttribute('data-command-value', 'Impact');
      fontButtonImpact.setAttribute('data-command-name', 'fontName');
      fontButtonImpact.classList.add('command-value');
      fontButtonImpact.innerText = 'Set font to Impact';
      var fontButtonArial = window.document.createElement('button');
      fontButtonArial.setAttribute('data-command-value', 'Arial');
      fontButtonArial.setAttribute('data-command-name', 'fontName');
      fontButtonArial.classList.add('command-value');
      fontButtonArial.innerText = 'Set font to Arial';

      // Add them to the DOM
      toolbarDiv.appendChild(defaultButton);
      toolbarDiv.appendChild(vendorButton);
      toolbarDiv.appendChild(fontButtonArial);
      toolbarDiv.appendChild(fontButtonImpact);
      body.appendChild(toolbarDiv);

      require(['../../src/scribe-plugin-toolbar'], function (toolbarPlugin) {
        window.scribe.use(toolbarPlugin(toolbarDiv, {}));
        done();
      });
    });
  });

  when('updating the toolbar ui', function () {
    beforeEach(function () {
      // Click in the contenteditable to enable/disable relevant buttons
      return scribeNode.click();
    });

    it('should not disable vendor buttons', function () {
      return driver.executeScript(function () {
        var vendorButtons = window.document.querySelectorAll('.scribe-toolbar button');
        Array.prototype.forEach.call(vendorButtons, function(button) {
          if (button.hasAttribute('data-command-name')) {
            // We have a default button, which is disabled when no text is
            // inserted
            expect(button.disabled).to.be.ok;
          } else {
            // We have a vendor button, it shouldn't be disabled
            expect(button.disabled).to.not.be.ok;
          }
        });
      });
    });
  });

  when('clicking a button with an associated command value', function() {
    it('should pass through the command value', function() {
      return driver.executeScript(function() {
        var commandValueButtons = window.document.querySelectorAll('.scribe-toolbar button.command-value');
        Array.prototype.forEach.call(commandValueButtons, function(button) {
          // Click the button
          button.click();

          // Verify that the command was executed with the appropriate value
          var expectedFont = button.dataset.commandValue;
          expect(document.queryCommandValue('fontName')).to.be(expectedFont);
        });
      });
    });
  });
});
