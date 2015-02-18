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
