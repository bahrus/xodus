# xodus [WIP]

xodus transforms HTML as it leaves the server and travels to the promised land of the end user's browser.

It is used to add dynamic content to declarative web components, defined as HTML, served via text/html and/or text/plain mime, accessible via a CDN url.  Many important, useful web components consist of 99% HTML / CSS / JSON, 1% JavaScript.  But strategically weaving in dynamic content into the web component before it arrives in the browser can provide a more satisfying initial view.  

xodus accomplishes this by providing helper classes that build on [CloudFlare's HTMLRewriter](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter).

Hopefully native browser service workers will support something [similar](https://discourse.wicg.io/t/proposal-support-cloudflares-htmlrewriter-api-in-workers/5721)  eventually, which would allow weaving in data held in local storage, for example.

Its syntax is specific (but extendable) for components that use the may-it-be family of element behaviors/decorators to achieve binding, beginning with [be-definitive](https://github.com/bahrus/be-definitive).

Name inspired by this [funny comment](https://twitter.com/davatron5000/status/1312955820137754624).

Usefulness of this project should grow if, W3C willing, something like [templ-mount](https://github.com/bahrus/templ-mount) is built into the platform.

