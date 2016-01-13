# resizabull

> Because other resize libraries are a bunch of bull

Work in progress!

[![npm Version][npm-badge]][npm]
[![Build Status][build-badge]][build-status]
[![Test Coverage][coverage-badge]][coverage-result]
[![Dependency Status][dep-badge]][dep-status]

## Installation

Install using npm:

    $ npm install resizabull

## Usage

```js
var resizabull = require('resizabull'),
    element = document.getElementById('resize-me'),
    resizer = resizabull(element);
```

## Available Options

#### `options.onResizeStart(resizer)`

Callback fired when a resize event has begun, receiving the `resizer` instance
itself as an argument.

#### `options.onResize(resizer)`

Callback fired when a resize has started and an edge has been moved, receiving
the `resizer` instance itself as an argument.

#### `options.onResizeStop(resizer)`

Callback fired when a resize event has ended, receiving the `resizer` instance
itself as an argument.

#### `options.threshold` (default: 5)

Tolerance, in pixels, for how far the mouse cursor may be from the edge of a
resizable element before the edge becomes draggable.

## Methods

The `resizabull` method returns a "resizer" instance with a number of methods:

#### `resizer#bindEvents()`

Method to add needed event listeners associated with the given __resizabull__
instance to the DOM.

NOTE: This method does not need to be called on newly instantiated resizers;
this is done automatically.

#### `resizer#unbindEvents()`

Method to remove all event listeners associated with the given __resizabull__
instance from the DOM.

## License

MIT

[build-badge]: https://img.shields.io/travis/jimf/resizabull/master.svg?style=flat-square
[build-status]: https://travis-ci.org/jimf/resizabull
[npm-badge]: https://img.shields.io/npm/v/resizabull.svg?style=flat-square
[npm]: https://www.npmjs.org/package/resizabull
[coverage-badge]: https://img.shields.io/coveralls/jimf/resizabull.svg?style=flat-square
[coverage-result]: https://coveralls.io/r/jimf/resizabull
[dep-badge]: https://img.shields.io/david/jimf/resizabull.svg?style=flat-square
[dep-status]: https://david-dm.org/jimf/resizabull
