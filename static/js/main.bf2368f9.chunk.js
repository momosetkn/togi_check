(this.webpackJsonptogi_check=this.webpackJsonptogi_check||[]).push([[0],{18:function(e,t,n){},19:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var c,i,a,d=n(1),r=n.n(d),s=n(9),o=n.n(s),j=(n(18),n(4)),l=n(2),h=n(13),b=(n(19),n(5)),O=n(0);var p=b.a.div(c||(c=Object(j.a)(["\n  height: 100vh;\n  width: 100vw;  \n"]))),x=b.a.div(i||(i=Object(j.a)(['\n  height: 100vh;\n  width: 100vw;\n  z-index: -1;\n  position: absolute;\n  background-image: url("','/hocho.jpg");\n  transform: scale(',", 1);\n"])),".",(function(e){return e.left?"1":"-1"})),u=b.a.div(a||(a=Object(j.a)(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  span {\n    background: #00000090;\n    color: #ffffff;\n    font-size: 10vw;\n  }\n"]))),m=function(){var e=Object(d.useState)({orientationAlpha:0,orientationBeta:0,orientationGamma:0,accelerationX:0,accelerationY:0,accelerationZ:0,measurementCount:0,speedX:0,speedY:0,speedZ:0,distance:0,measurementTime:(new Date).getTime(),diffTime:0}),t=Object(h.a)(e,2),n=t[0],c=t[1];return Object(d.useEffect)((function(){window.addEventListener("deviceorientation",(function(e){var t=e.alpha,n=e.beta,i=e.gamma;c((function(e){return Object(l.a)(Object(l.a)({},e),{},{orientationAlpha:t||0,orientationBeta:n||0,orientationGamma:i||0})}))})),window.addEventListener("devicemotion",(function(e){if(e.acceleration){var t=e.acceleration,n=t.x,i=t.y,a=t.z,d=(new Date).getTime();c((function(e){return Object(l.a)(Object(l.a)({},e),{},{accelerationX:n||0,accelerationY:i||0,accelerationZ:a||0,measurementCount:e.measurementCount+1,measurementTime:d,diffTime:d-e.measurementTime})}))}}))}),[]),Object(d.useEffect)((function(){var e=n.accelerationX,t=n.accelerationY,i=n.accelerationZ,a=n.speedX,d=n.speedY,r=n.speedZ,s=n.diffTime,o=function(e){var t=e.acceleration,n=e.speed,c=t*s,i=c+n;return{nowDistance:(i=(i*=0===c?.95:1)<1e-4?0:i)*s,nowSpeed:i}},j=function(){var n=o({acceleration:e||0,speed:a}),c=o({acceleration:t||0,speed:d}),s=o({acceleration:i||0,speed:r});return{distance:Math.sqrt(Math.pow(Math.sqrt(Math.pow(n.nowDistance,2)+Math.pow(c.nowDistance,2)),2)+Math.pow(s.nowDistance,2)),distanceAndSpeedX:n,distanceAndSpeedY:c,distanceAndSpeedZ:s}}(),h=j.distance,b=j.distanceAndSpeedX,O=j.distanceAndSpeedY,p=j.distanceAndSpeedZ;c((function(e){return Object(l.a)(Object(l.a)({},e),{},{speedX:b.nowSpeed,speedY:O.nowSpeed,speedZ:p.nowSpeed,distance:e.distance+h})}))}),[n.accelerationX,n.accelerationY,n.accelerationZ,n.speedX,n.speedY,n.speedZ,n.diffTime]),Object(O.jsxs)(p,{children:[Object(O.jsx)(x,{left:n.orientationGamma>0}),Object(O.jsx)(u,{children:Object(O.jsxs)("span",{children:[Math.abs(n.orientationGamma).toFixed(1),"\u5ea6"]})}),Object(O.jsxs)("table",{className:"value-table",children:[Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"orientationAlpha"}),Object(O.jsx)("td",{children:n.orientationAlpha.toFixed(1)})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"orientationBeta"}),Object(O.jsx)("td",{children:n.orientationBeta.toFixed(1)})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"orientationGamma"}),Object(O.jsx)("td",{children:n.orientationGamma.toFixed(1)})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"accelerationX"}),Object(O.jsx)("td",{children:n.accelerationX.toFixed(1)})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"accelerationY"}),Object(O.jsx)("td",{children:n.accelerationY.toFixed(1)})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"accelerationZ"}),Object(O.jsx)("td",{children:n.accelerationZ.toFixed(1)})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"measurementCount"}),Object(O.jsx)("td",{children:n.measurementCount})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"speedX"}),Object(O.jsx)("td",{children:n.speedX})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"speedY"}),Object(O.jsx)("td",{children:n.speedY})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"speedZ"}),Object(O.jsx)("td",{children:n.speedZ})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"distance"}),Object(O.jsx)("td",{children:(n.distance/1e6).toFixed(2)})]})]})]})},f=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,24)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,a=t.getLCP,d=t.getTTFB;n(e),c(e),i(e),a(e),d(e)}))};o.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(m,{})}),document.getElementById("root")),f()}},[[23,1,2]]]);
//# sourceMappingURL=main.bf2368f9.chunk.js.map