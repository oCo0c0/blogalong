!function(){"use strict";!function(t){var e=t.screen,r=e.width,n=e.height,a=t.navigator.language,o=t.location,i=t.localStorage,c=t.document,u=t.history,l=o.hostname,s=o.pathname,p=o.search,f=c.currentScript;if(f){var h=function(t,e,r){var n=t[e];return function(){for(var e=[],a=arguments.length;a--;)e[a]=arguments[a];return r.apply(null,e),n.apply(t,e)}},d=function(){return i&&i.getItem("haloTracker.disabled")||T&&function(){var e=t.doNotTrack,r=t.navigator,n=t.external,a="msTrackingProtectionEnabled",o=e||r.doNotTrack||r.msDoNotTrack||n&&a in n&&n[a]();return"1"==o||"yes"===o}()||j&&!w.includes(l)},g="data-",v=f.getAttribute.bind(f),m=v(g+"group")||"",k=v(g+"plural"),y=v(g+"name"),S=v(g+"host-url"),b="false"!==v(g+"auto-track"),T=v(g+"do-not-track"),j=v(g+"domains")||"",w=j.split(",").map((function(t){return t.trim()})),E=(S?S.replace(/\/$/,""):f.src.split("/").slice(0,-1).join("/"))+"/apis/api.blog.run/v1alpha1/trackers/counter",N=r+"x"+n,O=""+s+p,x=c.referrer,P=function(t,e){return void 0===t&&(t=O),void 0===e&&(e=x),function(t){if(!d())return fetch(E,{method:"POST",body:JSON.stringify(Object.assign({},t)),headers:{"Content-Type":"application/json"}}).then((function(t){return t.text()})).then((function(t){console.debug("Visit count:",t)}))}((r={group:m,plural:k,name:y,hostname:l,screen:N,language:a,url:O},n={url:t,referrer:e},Object.keys(n).forEach((function(t){void 0!==n[t]&&(r[t]=n[t])})),r));var r,n},V=function(t,e,r){if(r){x=O;var n=r.toString();(O="http"===n.substring(0,4)?"/"+n.split("/").splice(3).join("/"):n)!==x&&P()}};if(!t.haloTracker){var A=function(t){return trackEvent(t)};A.trackView=P,t.haloTracker=A}if(b&&!d()){u.pushState=h(u,"pushState",V),u.replaceState=h(u,"replaceState",V);var C=function(){"complete"===c.readyState&&P()};c.addEventListener("readystatechange",C,!0),C()}}}(window)}();