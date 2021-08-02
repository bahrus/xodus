export function toTempl(templ: Element, fromShadow: boolean){
    let templateToClone = templ as HTMLTemplateElement;
    if(!(templateToClone instanceof HTMLTemplateElement)){
        templateToClone = document.createElement('template');
        if(fromShadow){
            templateToClone.innerHTML = templ.shadowRoot.innerHTML;
        }else{
            templateToClone.innerHTML = templ.innerHTML;
        }
                
    }
    const bindAttr = 'data-bind';
    const targets = templateToClone.content.querySelectorAll(`[${bindAttr}]`);
    for(const target of targets){
        target.innerHTML = `{{${target.getAttribute(bindAttr)}}}`;
        target.removeAttribute(bindAttr);
    }
    return templateToClone;
}
