"use strict";

transferQueryParams($('.transmit-query-var'));

function addOrModifyQueryParameter(elem, parameter, newValue) {
  var attr = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'href';
  if (!elem || elem.length === 0) return false;
  var elemHref = elem.attr(attr);
  if (elemHref === '#') return '';else if (elemHref.charAt(0) === '/') elemHref = window.location.origin + elemHref;
  var elemUrl = new URL(elemHref);
  var elemValue = elemUrl.searchParams.get(parameter);
  var addedInterrogation = false;
  var newElemHref = elem.attr(attr);
  var hashtag = '';

  if (newElemHref.indexOf('#') >= 0) {
    // Temporarily remove # at the end of url
    hashtag = newElemHref.substring(newElemHref.indexOf('#'));
    newElemHref = newElemHref.slice(0, newElemHref.indexOf('#'));
  }

  if (!newElemHref.includes('?')) {
    // Insert ? if not present
    newElemHref += '?';
    addedInterrogation = true;
  }

  if (elemValue) {
    // Modify
    newElemHref = newElemHref.replace("".concat(parameter, "=").concat(elemValue), "".concat(parameter, "=").concat(newValue));
  } else {
    // Add
    if (addedInterrogation) newElemHref += "".concat(parameter, "=").concat(newValue);else newElemHref += "&".concat(parameter, "=").concat(newValue);
  }

  elem.attr(attr, newElemHref + hashtag);
}

function transferQueryParams($links) {
  var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'href';
  var url_string = window.location.href;
  var url = new URL(url_string);
  url.searchParams.forEach(function (value, key) {
    $links.each(function () {
      var authorized_keys = ['reserved_code_origine'];

      if (authorized_keys.includes(key)) {
        addOrModifyQueryParameter($(this), key, value, attr);
      }
    });
  });
}