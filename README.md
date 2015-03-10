# scribe-plugin-toolbar [![Build Status](https://travis-ci.org/guardian/scribe-plugin-toolbar.svg?branch=master)](https://travis-ci.org/guardian/scribe-plugin-toolbar)

A toolbar of buttons and shortcuts for Scribe

## Installation
```
bower install scribe-plugin-toolbar
```

Alternatively, you can [access the distribution files through GitHub releases](https://github.com/guardian/scribe-plugin-toolbar/releases).

## Usage Example

scribe-plugin-toolbar is an AMD module:

``` js
require(['scribe', 'scribe-plugin-toolbar'], function (Scribe, scribePluginToolbar) {
  var scribeElement = document.querySelector('.scribe');
  // Create an instance of Scribe
  var scribe = new Scribe(scribeElement);

  var toolbarElement = document.querySelector('.toolbar');
  scribe.use(scribePluginToolbar(toolbarElement));
});
```

It will find command elements within the passed in element.

``` html
<div class"scribe">
  <div class="toolbar">
    <button data-command-name='bold'>Bold</button>
    <button data-command-name='italic'>Italic</button>
    <div class='sig-group'>
      <button data-command-name='insertSignature'
              data-command-value='cursive-sig.png'>
              Insert Cursive Signature
      </button>
      <button data-command-name='insertSignature'
              data-command-value='print-sig.png'>
              Insert Print Signature
      </button>
    </div>
    <img src="sub.png" data-command>
  </div>
</div>
```

## Documentation

**Function:** `scribeToolbarPlugin(toolbarElement)`

Takes an element containing command elements.
Returns a plugin for `scribe.use()`

**Attribute:** `data-command-name`

Tells the plugin this is a command element.
The value must be the name of a command scribe can handle.

The command will be executed when the element is clicked.

**Attribute:** `data-command-value`

Optional.
This value is passed to the command with `execute()` and `queryState()`.

**Attribute:** `disabled`

Updated by the plugin with the `content-change` event.
The attribute is toggled to match the state of `command.queryEnabled()`.

**Class:** `active`

Updated by the plugin with the `content-change` event.
The class is toggled to match the state of `command.queryState(value)`.
