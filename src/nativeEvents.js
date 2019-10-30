const nativeEvents = ['click','dblclick','mouseup','mousedown','contextmenu',// mouse buttons
    'mousewheel','mousemultiwheel','DOMMouseScroll', // mouse wheel
    'mouseover','mouseout','mousemove','selectstart','selectend', // mouse movement
    'keydown','keypress','keyup', // keyboard
    'orientationchange', // mobile
    'focus','blur','change','reset','select','submit','input','invalid', // form elements
    'load','unload','beforeunload','resize','move','DOMContentLoaded','readystatechange','message', // window
    'error','abort','scroll', // misc
    'show',
    'touchstart','touchmove','touchend','touchcancel', // touch
    'gesturestart','gesturechange','gestureend', // gesture
    'textinput', // text
    'readystatechange','pageshow','pagehide','popstate', // window
    'hashchange','offline','online', // window
    'afterprint','beforeprint', // print
    'dragstart','dragenter','dragover','dragleave','drag','drop','dragend', // drag and drop
    'loadstart','progress','suspend','emptied','stalled','loadmetadata', // media
    'loadeddata','canplay','canplaythrough','playing','waiting','seeking', // media
    'seeked','ended','durationchange','timeupdate','play','pause','ratechange', // media
    'volumechange','cuechange', // media
    'checking','noupdate','downloading','cached','updateready','obsolete' // appcache
]

export const isNative = (event) => nativeEvents.includes(event)
