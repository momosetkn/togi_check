(this.webpackJsonptogi_check=this.webpackJsonptogi_check||[]).push([[0],{18:function(e,t,n){},19:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var c,i,a,r=n(1),d=n.n(r),o=n(9),s=n.n(o),j=(n(18),n(4)),l=n(2),h=n(13),b=(n(19),n(5)),O=n(0);var x=b.a.div(c||(c=Object(j.a)(["\n  height: 100vh;\n  width: 100vw;  \n"]))),m=b.a.div(i||(i=Object(j.a)(['\n  height: 100vh;\n  width: 100vw;\n  z-index: -1;\n  position: absolute;\n  background-image: url("','/hocho.jpg");\n  transform: scale(',", 1);\n"])),".",(function(e){return e.left?"1":"-1"})),u=b.a.div(a||(a=Object(j.a)(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  span {\n    background: #00000090;\n    color: #ffffff;\n    font-size: 10vw;\n  }\n"]))),p=function(){var e=Object(r.useState)({orientationAlpha:0,orientationBeta:0,orientationGamma:0,accelerationX:0,accelerationY:0,accelerationZ:0,measurementCount:0,speedX:0,speedY:0,speedZ:0,distance:0,measurementTime:(new Date).getTime(),diffTime:0}),t=Object(h.a)(e,2),n=t[0],c=t[1];return Object(r.useEffect)((function(){window.addEventListener("deviceorientation",(function(e){var t=e.alpha,n=e.beta,i=e.gamma;c((function(e){return Object(l.a)(Object(l.a)({},e),{},{orientationAlpha:t||0,orientationBeta:n||0,orientationGamma:i||0})}))})),window.addEventListener("devicemotion",(function(e){if(e.acceleration){var t=e.acceleration,n=t.x,i=t.y,a=t.z,r=(new Date).getTime();c((function(e){return Object(l.a)(Object(l.a)({},e),{},{accelerationX:n||0,accelerationY:i||0,accelerationZ:a||0,measurementCount:e.measurementCount+1,measurementTime:r,diffTime:r-e.measurementTime})}))}}))}),[]),Object(r.useEffect)((function(){var e=n.accelerationX,t=n.accelerationY,i=n.accelerationZ,a=n.speedX,r=n.speedY,d=n.speedZ,o=n.diffTime,s=function(e){var t=e.acceleration,n=e.speed,c=t*o+n;return{nowDistance:c*o,nowSpeed:c}},j=s({acceleration:e||0,speed:a}),h=s({acceleration:t||0,speed:r}),b=s({acceleration:i||0,speed:d}),O=Math.sqrt(Math.pow(Math.sqrt(Math.pow(j.nowDistance,2)+Math.pow(h.nowDistance,2)),2)+Math.pow(b.nowDistance,2));c((function(e){return Object(l.a)(Object(l.a)({},e),{},{speedX:j.nowSpeed,speedY:h.nowSpeed,speedZ:b.nowSpeed,distance:e.distance+O})}))}),[n.accelerationX,n.accelerationY,n.accelerationZ,n.speedX,n.speedY,n.speedZ,n.diffTime]),Object(O.jsxs)(x,{children:[Object(O.jsx)(m,{left:n.orientationGamma>0}),Object(O.jsx)(u,{children:Object(O.jsxs)("span",{children:[Math.abs(n.orientationGamma).toFixed(1),"\u5ea6"]})}),Object(O.jsxs)("table",{className:"value-table",children:[Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"orientationAlpha"}),Object(O.jsx)("td",{children:n.orientationAlpha.toFixed(1)})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"orientationBeta"}),Object(O.jsx)("td",{children:n.orientationBeta.toFixed(1)})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"orientationGamma"}),Object(O.jsx)("td",{children:n.orientationGamma.toFixed(1)})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"motionX"}),Object(O.jsx)("td",{children:n.accelerationX.toFixed(1)})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"motionY"}),Object(O.jsx)("td",{children:n.accelerationY.toFixed(1)})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"motionZ"}),Object(O.jsx)("td",{children:n.accelerationZ.toFixed(1)})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"x"}),Object(O.jsx)("td",{children:n.measurementCount})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"speedX"}),Object(O.jsx)("td",{children:n.speedX})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"speedY"}),Object(O.jsx)("td",{children:n.speedY})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"speedZ"}),Object(O.jsx)("td",{children:n.speedZ})]}),Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:"distance"}),Object(O.jsx)("td",{children:n.distance})]})]})]})},f=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,24)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),c(e),i(e),a(e),r(e)}))};s.a.render(Object(O.jsx)(d.a.StrictMode,{children:Object(O.jsx)(p,{})}),document.getElementById("root")),f()}},[[23,1,2]]]);
//# sourceMappingURL=main.b3b63fe5.chunk.js.map