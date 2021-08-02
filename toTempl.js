export function toTempl(templ) {
    let templateToClone = templ;
    if (!(templateToClone instanceof HTMLTemplateElement)) {
        templateToClone = document.createElement('template');
        if (templ.localName === options.as && templ.shadowRoot !== null) {
            templateToClone.innerHTML = templ.shadowRoot.innerHTML;
        }
        else {
            templateToClone.innerHTML = templ.innerHTML;
        }
    }
    const bindAttr = 'data-bind';
    const targets = templateToClone.content.querySelectorAll(`[${bindAttr}]`);
    for (const target of targets) {
        target.innerHTML = `{{${target.getAttribute(bindAttr)}}}`;
        target.removeAttribute(bindAttr);
    }
}
