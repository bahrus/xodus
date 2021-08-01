# xodus

xodus is a templating language that is compatible with fully formed, (server-rendered) HTML.

It can be reverse-engineered into moustache-style template syntax, such as the syntax proposed for template instantiation.

It can also be viewed as an "intermediate" templating language, generated from JS template literals, or JSX, that can be reverse compiled into other templating languages.

The goals are:

1.  The output should impose as little extra overhead on the server-rendered HTML as possible.
2.  Can be reverse engineered into the data structures from which the HTML was generated. (h2o fr)
3.  Provides enough information to apply well-performing updates on the rendered HTML DOM as client-side data changes.
4.  Compatible with any language capable of parsing HTML and JSON.

Example 1:

```html
<a href=//cnn.com data-bind="This is {{network}}">This is cnn</a>
```

function h2oFromStone(tbd) take this DOM node, and generate object: {network: 'cnn'}

function toTempl(tbd) can take this DOM node, and generate:

```html
<template><a>This is {{network}}</a></template>
```

Name inspired by this [funny comment](https://twitter.com/davatron5000/status/1312955820137754624).

