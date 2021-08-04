# xodus [WIP]

xodus is a templating language that is compatible with fully formed, (server-rendered) HTML.

It can be reverse-engineered into moustache-style template syntax, such as the syntax proposed for template instantiation.

It can also be viewed as an "intermediate" templating language, generated from JS template literals, or JSX, that can be reverse compiled into other templating languages.

The goals are:

1.  The output should impose as little extra overhead on the server-rendered HTML as possible.
2.  Can be reverse engineered into the data structures from which the HTML was generated. (h2oExtract)
3.  Provides enough information to apply well-performing updates on the rendered HTML DOM as client-side data changes.
4.  Could be used as an HTML-based templating language on the server.   
4.  Compatible with any language capable of parsing HTML and JSON.

Example 1: 

```html
<a x-f=network>cnn</a>
```
function h2oExtract take this DOM node, and generates object: {network: 'cnn'}.

x-f stands for "expand from", or "expanded from", depending on the context.

function toTempl takes this node and  generates (in memory):

```html
<template><a>{{network}}</a></template>
```


function xodus takes as input:

1. DOM node:

```html
<a x-f=network></a>
```

and 

2.  Object:

```JSON
{"network": "cnn"}
```

and generates

```html
<a x-f=network>cnn</a>
```

---

Example 1a:

```html
<a data-xf=network>cnn</a>
```

The functions described above do the same thing.

---


Example 2:  Extrapolation (?)

```html
<a x-f="This is {{network}}">This is cnn</a>
```

function h2oExtract(tbd) take this DOM node, and generates object: {network: 'cnn'}.

function toTempl(tbd) can take this DOM node, and generates:

```html
<template><a>This is {{network}}</a></template>
```

function xodus takes the DOM node:

```html
<a x-f="This is {{network}}"></a>
```

and

```JSON
{"network": "cnn"}
```

and generates

```html
<a x-f="This is {{network}}">This is cnn</a>
```

---

Example 3:  

```html
<a href=//cnn.com x-f='{".textContent":"This is {{network}}", "href":"networkURL"}'>This is cnn</a>
```

h2oExtract generates {network: 'cnn', networkURL: '//cnn.com'}

toTempl generates 

```html
<template><a href={{networkURL}}>This is {{network}}</a></template>
```

TODO I

If a key starts with a period, like ".textContent" then it refers to a property of the element.  Otherwise, the key refers to the attribute.

This raises a tricky conundrum for xodus.  There are performance benefits to using properties instead of attributes, on the client, especially for non string properties.

(Perhaps the issue isn't that significant as long as template instantiation only binds to attributes).

During server-side rendering, properties don't make sense (so the .textContent will need to be hard-coded to mean "this goes inside the tag)".

TODO 2

What if a node has some text with dynamic interpolation, but also some child nodes.  So say the template we want to generate looks like:

```html
<template><a>This is {{network}}.  <span>The most trusted name in {{genre}}</span></a>  Copyright {{year}}</template>
```

Proposed solution:

```html
<a x-f='{".textContent":["This is {{network}}.  ", "  Copyright {{year}}"], "href":"networkURL"}'>This is cnn.  </a>
```

Example 4:

```html
<a href=//cnn.com x-f='[{"repeat":3, "list": "newsStations"},{"TextContent":"This is {{network}}"},{"href":"networkURL"}]'>This is cnn</a>
<a href=//foxnews.com>This is Fox News</a>
<a href=//msnbc.com>This is MSNBC</a>
```

h2oExtract generates {newsStations: [{network: 'cnn', networkURL: '//cnn.com'}, {network: 'Fox News', networkURL: '//foxnews.com'}, {network: 'msnbc', networkURL: '//msnbc.com'}]}

toTempl generates ?

```html
<template for:each={{newsStations}}><a href={{networkURL}}>This is {{network}}</a>
```

Name inspired by this [funny comment](https://twitter.com/davatron5000/status/1312955820137754624).

