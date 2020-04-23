transferQueryParams($('.transmit-query-var'));

function addOrModifyQueryParameter(elem, parameter, newValue, attr = 'href') {
    if (!elem || elem.length === 0)
    return false;
    
    let elemHref = elem.attr(attr);
    
    if (elemHref === '#')
        return '';
    else if (elemHref.charAt(0) === '/') 
        elemHref = window.location.origin + elemHref;

    const elemUrl = new URL(elemHref);
    const elemValue = elemUrl.searchParams.get(parameter);
    
    let addedInterrogation = false;
    let newElemHref = elem.attr(attr);
    let hashtag = '';

    if (newElemHref.indexOf('#') >= 0) { // Temporarily remove # at the end of url
        hashtag = newElemHref.substring(newElemHref.indexOf('#'));
        newElemHref = newElemHref.slice(0, newElemHref.indexOf('#'));
    } 

    if (!newElemHref.includes('?')) {  // Insert ? if not present
        newElemHref += '?';
        addedInterrogation = true;
    }
    
    if (elemValue) {
        // Modify
        newElemHref = newElemHref.replace(`${parameter}=${elemValue}`, `${parameter}=${newValue}`)
    } else {
        // Add
        if (addedInterrogation)
            newElemHref += `${parameter}=${newValue}`;
        else
            newElemHref += `&${parameter}=${newValue}`;
    }
    elem.attr(attr, newElemHref + hashtag);
}

function transferQueryParams($links, attr = 'href') {
    const url_string = window.location.href;
    const url = new URL(url_string);
    
    url.searchParams.forEach((value, key) => {
        $links.each(function() {
            const authorized_keys = ['reserved_code_origine'];
            
            if (authorized_keys.includes(key)) {
                addOrModifyQueryParameter($(this), key, value, attr);
            }
        });
    });
}

searchParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null){
       return null;
    }
    else {
       return decodeURI(results[1]) || 0;
    }
}