function addOrModifyQueryParameter(r,e,a,n){if(void 0===n&&(n="href"),!r||0===r.length)return!1;let t=r.attr(n);if("#"===t)return"";"/"===t.charAt(0)&&(t=window.location.origin+t);const i=new URL(t).searchParams.get(e);let o=!1,s=r.attr(n),c="";s.indexOf("#")>=0&&(c=s.substring(s.indexOf("#")),s=s.slice(0,s.indexOf("#"))),s.includes("?")||(s+="?",o=!0),i?s=s.replace(e+"="+i,e+"="+a):s+=o?e+"="+a:"&"+e+"="+a,r.attr(n,s+c)}function transferQueryParams(r,e){void 0===e&&(e="href");const a=window.location.href;new URL(a).searchParams.forEach((a,n)=>{r.each((function(){["reserved_code_origine"].includes(n)&&addOrModifyQueryParameter($(this),n,a,e)}))})}transferQueryParams($(".transmit-query-var"));