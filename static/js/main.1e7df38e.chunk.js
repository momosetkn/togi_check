(this.webpackJsonptogi_check=this.webpackJsonptogi_check||[]).push([[0],{229:function(e,t,n){},346:function(e,t,n){"use strict";n.r(t);var c,a,i,r,d,s=n(2),o=n.n(s),j=n(92),l=n.n(j),h=(n(229),n(52)),b=n(25),O=n(40),u=n(8),x=(n(77),n(53)),f=n(3),p=function(){var e=Object(s.useState)({orientationAlpha:0,orientationBeta:0,orientationGamma:0,accelerationX:0,accelerationY:0,accelerationZ:0,measurementCount:0,measurementTime:(new Date).getTime(),diffTime:0}),t=Object(u.a)(e,2),n=t[0],c=t[1],a=Object(s.useState)({speedX:0,speedY:0,speedZ:0,distance:0}),i=Object(u.a)(a,2),r=i[0],d=i[1],o=Object(s.useState)({plottingDistance:0,data:[]}),j=Object(u.a)(o,2),l=j[0],h=j[1];return Object(s.useEffect)((function(){window.addEventListener("deviceorientation",(function(e){var t=e.alpha,n=e.beta,a=e.gamma;c((function(e){return Object(O.a)(Object(O.a)({},e),{},{orientationAlpha:t||0,orientationBeta:n||0,orientationGamma:a||0})}))})),window.addEventListener("devicemotion",(function(e){if(e.acceleration){var t=e.acceleration,n=t.x,a=t.y,i=t.z,r=(new Date).getTime();c((function(e){return Object(O.a)(Object(O.a)({},e),{},{accelerationX:n||0,accelerationY:a||0,accelerationZ:i||0,measurementCount:e.measurementCount+1,measurementTime:r,diffTime:r-e.measurementTime})}))}}))}),[]),Object(s.useEffect)((function(){var e=n.accelerationX,t=n.accelerationY,c=n.accelerationZ,a=n.diffTime,i=r.speedX,s=r.speedY,o=r.speedZ,j=function(e){var t=e.acceleration,n=e.speed,c=t*a,i=c+n;return{nowDistance:(i=(i*=0===c?.98:1)<1e-4?0:i)*a,nowSpeed:i}},l=function(){var n=j({acceleration:e||0,speed:i}),a=j({acceleration:t||0,speed:s}),r=j({acceleration:c||0,speed:o});return{additionalDistance:Math.sqrt(Math.pow(Math.sqrt(Math.pow(n.nowDistance,2)+Math.pow(a.nowDistance,2)),2)+Math.pow(r.nowDistance,2)),nowSpeedX:n.nowSpeed,nowSpeedY:a.nowSpeed,nowSpeedZ:r.nowSpeed}}(),h=l.additionalDistance,b=l.nowSpeedX,u=l.nowSpeedY,x=l.nowSpeedZ;d((function(e){return Object(O.a)(Object(O.a)({},e),{},{speedX:b,speedY:u,speedZ:x,distance:e.distance+h})}))}),[n.accelerationX,n.accelerationY,n.accelerationZ,n.diffTime,r.speedX,r.speedY,r.speedZ]),Object(s.useEffect)((function(){r.distance-l.plottingDistance>=m&&h((function(e){return Object(O.a)(Object(O.a)({},e),{},{plottingDistance:r.distance,data:e.data.length>g?[]:[].concat(Object(b.a)(e.data),[n.orientationGamma])})}))}),[r.distance,n.orientationGamma]),Object(f.jsxs)(w,{children:[Object(f.jsx)(v,{children:Object(f.jsxs)("span",{children:[Math.abs(n.orientationGamma).toFixed(1),"\u5ea6"]})}),Object(f.jsxs)("table",{className:"value-table",children:[Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:"orientationAlpha"}),Object(f.jsx)("td",{children:n.orientationAlpha.toFixed(1)})]}),Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:"orientationBeta"}),Object(f.jsx)("td",{children:n.orientationBeta.toFixed(1)})]}),Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:"orientationGamma"}),Object(f.jsx)("td",{children:n.orientationGamma.toFixed(1)})]}),Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:"accelerationX"}),Object(f.jsx)("td",{children:n.accelerationX.toFixed(1)})]}),Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:"accelerationY"}),Object(f.jsx)("td",{children:n.accelerationY.toFixed(1)})]}),Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:"accelerationZ"}),Object(f.jsx)("td",{children:n.accelerationZ.toFixed(1)})]}),Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:"measurementCount"}),Object(f.jsx)("td",{children:n.measurementCount})]}),Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:"speedX"}),Object(f.jsx)("td",{children:r.speedX})]}),Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:"speedY"}),Object(f.jsx)("td",{children:r.speedY})]}),Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:"speedZ"}),Object(f.jsx)("td",{children:r.speedZ})]}),Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:"distance"}),Object(f.jsx)("td",{children:(r.distance/1e6).toFixed(2)})]}),Object(f.jsxs)("tr",{children:[Object(f.jsx)("td",{children:"graph.data"}),Object(f.jsx)("td",{children:JSON.stringify(l.data)})]})]})]})},m=1e6,g=1e3,w=x.a.div(c||(c=Object(h.a)(["\n  height: 100vh;\n  width: 100vw;  \n"]))),v=x.a.div(a||(a=Object(h.a)(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  span {\n    background: #00000090;\n    color: #ffffff;\n    font-size: 10vw;\n  }\n"]))),S=function(){var e=Object(s.useState)(0),t=Object(u.a)(e,2),n=t[0],c=t[1];return Object(s.useEffect)((function(){window.addEventListener("deviceorientation",(function(e){c(e.gamma||0)}))}),[]),Object(f.jsxs)(F,{children:[Object(f.jsx)(X,{left:n>0}),Object(f.jsx)(Y,{children:Object(f.jsxs)("span",{children:[Math.abs(n).toFixed(1),"\u5ea6"]})})]})},F=x.a.div(i||(i=Object(h.a)(["\n  height: 100vh;\n  width: 100vw;  \n"]))),X=x.a.div(r||(r=Object(h.a)(['\n  height: 100vh;\n  width: 100vw;\n  z-index: -1;\n  position: absolute;\n  background-image: url("','/hocho.jpg");\n  transform: scale(',", 1);\n"])),".",(function(e){return e.left?"1":"-1"})),Y=x.a.div(d||(d=Object(h.a)(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  span {\n    background: #00000090;\n    color: #ffffff;\n    font-size: 10vw;\n  }\n"]))),Z=n(127),D=n(16),T=function(){return Object(f.jsx)("h1",{children:"Not Found"})},y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,385)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),i(e),r(e)}))},k=function(){var e=Object(D.f)();return Object(s.useEffect)((function(){var t=localStorage.getItem("start_path");localStorage.removeItem("start_path"),t&&e.push(t)}),[]),Object(f.jsx)("h1",{children:"StartPage"})},E=n(213),M=function(e){var t=e.data,n=e.length,c=[{id:e.dataTitle||"\u30c7\u30fc\u30bf",color:"hsl(32, 70%, 50%)",data:Object(b.a)(Array(n)).map((function(e,n){return{x:"".concat(n),y:t[n]||0}}))}];return Object(f.jsx)(E.a,{width:900,height:400,margin:{top:20,right:20,bottom:60,left:80},animate:!0,enableSlices:"x",data:c,enableArea:!0,yScale:{type:"linear",stacked:!0},curve:"natural",fill:[{match:"*",id:"gradientA"}]})};l.a.render(Object(f.jsx)(o.a.StrictMode,{children:Object(f.jsx)(Z.a,{basename:"/togi_check",children:Object(f.jsxs)(D.c,{children:[Object(f.jsx)(D.a,{exact:!0,path:"/",children:Object(f.jsx)(k,{})}),Object(f.jsx)(D.a,{path:"/angle",children:Object(f.jsx)(S,{})}),Object(f.jsx)(D.a,{path:"/training",children:Object(f.jsx)(p,{})}),Object(f.jsx)(D.a,{path:"/graph",children:Object(f.jsx)(M,{data:[1,2,3,2,3],length:5})}),Object(f.jsx)(D.a,{children:Object(f.jsx)(T,{})})]})})}),document.getElementById("root")),y()},77:function(e,t,n){}},[[346,1,2]]]);
//# sourceMappingURL=main.1e7df38e.chunk.js.map