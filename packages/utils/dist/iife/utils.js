!function(i){"use strict";i.getSeconds=function(){var i=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=i.seconds,n=void 0===t?0:t,u=i.minutes,v=void 0===u?0:u,e=i.hours,o=void 0===e?0:e,s=i.days,d=void 0===s?0:s,a=i.weeks,l=void 0===a?0:a,r=i.months,c=void 0===r?0:r,h=i.years;return[{unit:n,val:1},{unit:v,val:60},{unit:o,val:3600},{unit:d,val:86400},{unit:l,val:604800},{unit:c,val:2628e3},{unit:void 0===h?0:h,val:3154e4}].reduce(function(i,t){return i+t.unit*t.val},0)}}(this.bmiUtils=this.bmiUtils||{});
