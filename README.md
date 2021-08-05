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
function h2oExtract takes this DOM node, and generates object: {network: 'cnn'}.

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


Example 2:  Facing the Music, Part I

The interpolation requirement seems problematic, however you look at it.  It is tempting to say "why not just wrap all dynamic content inside a span"? or something, but the concept of interpolation applies to attributes as well.  But let's start with innerHTML / textContent

```html

<a><template x-f='{".textContent":[8, 11]}'>{{network}}</template>This is cnn</a>
```

function h2oExtract(tbd) take this DOM node, and generates object: {network: 'cnn'}.

function toTempl(tbd) can take this DOM node, and generates:

```html
<template><a>This is {{network}}</a></template>
```

function xodus takes the DOM node:

```html
<a><template x-f='{".textContent":[8, 11]}'>{{network}}</template>This is </a>
```

and

```JSON
{"network": "cnn"}
```

and generates

```html
<a><template x-f='{".textContent":[8, 11]}'>{{network}}</template>This is cnn</a>
```

 

---

Example 3:  

```html
<a href=//cnn.com x-f='{".textContent":"network", "href":"networkURL"}'>cnn</a>
```

h2oExtract generates {network: 'cnn', networkURL: '//cnn.com'}

toTempl generates 

```html
<template><a href={{networkURL}}>{{network}}</a></template>
```

---

Example 4: Facing the music, Part II

```html
<template x-f><a href="{{networkURL='cnn.com'}}?article-id={{articleID='2021/08/04/us/florida-school-mask-mandate-law/index.html'}}" x-f=networkURL>cnn</a>
```


TODO I

For Example 3 ... If a key starts with a period, like ".textContent" then it refers to a property of the element.  Otherwise, the key refers to the attribute.

This raises a tricky conundrum for xodus.  There are performance benefits to using properties instead of attributes, on the client, especially for non string properties.

(Perhaps the issue isn't that significant as long as template instantiation only binds to attributes).

During server-side rendering, properties don't make sense (so the .textContent will need to be hard-coded to mean "this goes inside the tag)".



Example 5: Facing the music, Part III

```html
<a x-f='{"href":[[0,13],[14]]}' href=//foxnews.com/politics/desantis-biden-do-job-secure-border>Fox News</a>
<a x-f='{"href": [[0, 11], [12]]]}' href=//msnbc.com/opinion/why-tucker-carlson-s-trip-budapest-bad-news-america-n1275881>MSNBC</a>
<template x-f="repeat of 3 newsStations><a href="{{networkURL='//cnn.com'}}{{articleID='/2021/08/04/us/florida-school-mask-mandate-law/index.html'}}" x-f=networkURL>CNN</a></template>
```

h2oExtract generates 

```JSON
{"newsStations": [
    {"network": "Fox News", "networkURL": "//foxnews.com", "articleID": "/politics/desantis-biden-do-job-secure-border"}, 
    {"network": "MSNBC", "networkURL": "//msnbc.com", "articleID": "/opinion/why-tucker-carlson-s-trip-budapest-bad-news-america-n1275881"}, 
    {"network": "CNN", "networkURL": "//cnn.com", "articleID": }, ]}
```

toTempl generates ?

```html
<template for:each={{newsStations}}><a href={{networkURL}}{{articleID}}>{{network}}</a>
```

Name inspired by this [funny comment](https://twitter.com/davatron5000/status/1312955820137754624).

