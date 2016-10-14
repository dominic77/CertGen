# contentmodal

## Description

Component for standardizing modals across content components.  Feel free to use elsewhere if desired.

## Dependencies

* [jQuery](https://github.com/jquery/jquery)
* [Backbone](https://github.com/jashkenas/backbone)
* [Underscore](http://underscorejs.org/)

## Instantiation

## Instantiation

### Constructor

    var Contentmodal = require('certgen');

    // @param {object} options Configuration options for the control (optional)
    // @param {element} element DOM Element to render the control into (optional)
    // element can be accessed at control.elements.wrapper
    var control = new certgen(options, element);

    // Methods are called directly on the control
    control.show();

### jQuery widget

    require('certgen');

    // @param {object} options Configuration options for the control (optional)
    $element.certgen(options);

    // Methods are called through the $.fn methods
    $element.certgen('show');

## CSS

```html
<link rel="stylesheet" href="dist/css/certgen.css">
```

## Options
Name | Description | Type | Default
--- | --- | --- | ---

## Methods
Name | Description | Parameters
--- | --- | ---

## Build Command

    grunt

## Copyright and License


