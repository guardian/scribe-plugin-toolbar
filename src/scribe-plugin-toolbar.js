/**
 * Plugin to attach functionality to the Scribe editor toolbar.
 * Example markup of toolbar:
 *
 * <button data-command-name="bold"<strong>B</strong></button>
 * <button data-command-name="italic"><em>I</em></button>
 * <button data-command-name="code" data-disabled-tags="ol,ul,table">Code</button>
 *
 * Supported data attributes:
 *
 * data-command-name: Command name.
 * data-command-value: Command value.
 * data-disabled-tags: Tags for which the command is disabled.
 */
define(function () {

  'use strict';

  return function (toolbarNode) {
    return function (scribe) {
      var buttons = toolbarNode.querySelectorAll('[data-command-name]');

      Array.prototype.forEach.call(buttons, function (button) {
        button.addEventListener('click', function () {
          // Look for a predefined command.
          var command = scribe.getCommand(button.dataset.commandName);

          /**
           * Focus will have been taken away from the Scribe instance when
           * clicking on a button (Chrome will return the focus automatically
           * but only if the selection is not collapsed. As per: http://jsbin.com/tupaj/1/edit?html,js,output).
           * It is important that we focus the instance again before executing
           * the command, because it might rely on selection data.
           */
          scribe.el.focus();
          command.execute(button.dataset.commandValue);
          /**
           * Chrome has a bit of magic to re-focus the `contenteditable` when a
           * command is executed.
           * As per: http://jsbin.com/papi/1/edit?html,js,output
           */
        });

        function update() {
          // Look for a predefined command.
          var command = scribe.getCommand(button.dataset.commandName);
          var selection = new scribe.api.Selection();
          var disabledTags = button.dataset.disabledTags ? button.dataset.disabledTags.split(',') : [];

          var shouldDisable = selection.getContaining(function(node) {
            var nodeName = node.nodeName.toLowerCase();
            return (disabledTags.indexOf(nodeName) !== -1);
          });

          // see https://github.com/guardian/scribe/issues/208
          var isListCommand = ['insertUnorderedList', 'insertOrderedList'].indexOf(command) !== -1;

          // TODO: Do we need to check for the selection?
          if (selection.range && !isListCommand && command.queryState(button.dataset.commandValue)) {
            button.classList.add('active');
          } else {
            button.classList.remove('active');
          }

          if (selection.range && command.queryEnabled() && !shouldDisable) {
            button.removeAttribute('disabled');
          } else {
            button.setAttribute('disabled', 'disabled');
          }
        }

        // Keep the state of toolbar buttons in sync with the current selection.
        // Unfortunately, there is no `selectionchange` event.
        scribe.el.addEventListener('keyup', update);
        scribe.el.addEventListener('mouseup', update);

        scribe.el.addEventListener('focus', update);
        scribe.el.addEventListener('blur', update);

        // We also want to update the UI whenever the content changes. This
        // could be when one of the toolbar buttons is actioned.
        scribe.on('content-changed', update);
      });
    };
  };

});
