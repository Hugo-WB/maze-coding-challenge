(()=>{"use strict";var t={137:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0});var a=i(607),n=i(236),h=function(){function t(t,e){this.start={x:0,y:0},this.end={x:0,y:0},this.phazors=[],this.height=null!=e?e:Math.floor(a.canvas.height/(a.CELL_WIDTH+a.LINE_WIDTH)),this.width=null!=t?t:Math.floor(a.canvas.width/(a.CELL_WIDTH+a.LINE_WIDTH)),this.maze=n.generateEllers(this.width,this.height),this.end={x:Math.round(Math.random()*(this.width-1)),y:Math.round(Math.random()*(this.height-1))};for(var i=0;i<Math.round(this.height*this.width/200);i++)this.phazors.push([Math.round(Math.random()*(this.width-1)),Math.round(Math.random()*(this.height-1))])}return t.prototype.update=function(){},t.prototype.draw=function(){var t={x:a.LINE_WIDTH+a.OFFSET.x,y:a.LINE_WIDTH+a.OFFSET.y};a.ctx.fillStyle="red",a.ctx.fillRect((this.end.x+1)*a.LINE_WIDTH+this.end.x*a.CELL_WIDTH+a.OFFSET.x,(this.end.y+1)*a.LINE_WIDTH+this.end.y*a.CELL_WIDTH+a.OFFSET.y,a.CELL_WIDTH,a.CELL_WIDTH),a.ctx.fillStyle="blue",this.phazors.forEach((function(t){a.ctx.fillRect((t[0]+1)*a.LINE_WIDTH+t[0]*a.CELL_WIDTH+a.OFFSET.x,(t[1]+1)*a.LINE_WIDTH+t[1]*a.CELL_WIDTH+a.OFFSET.y,a.CELL_WIDTH,a.CELL_WIDTH)})),a.ctx.fillStyle="black",a.ctx.beginPath();for(var e={x:[Math.max(0,Math.round(-a.OFFSET.x/a.CELL_WIDTH*.9)),Math.min(this.width,Math.round(-a.OFFSET.x/a.CELL_WIDTH+2*Math.floor(a.canvas.width/(a.CELL_WIDTH+a.LINE_WIDTH)/2)+2))],y:[Math.max(0,Math.round(.9*-a.OFFSET.y/a.CELL_WIDTH)),Math.min(this.height,Math.round(-a.OFFSET.y/a.CELL_WIDTH)+2*Math.floor(a.canvas.height/(a.CELL_WIDTH+a.LINE_WIDTH)/2)+2)]},i=e.y[0];i<e.y[1];i++){t.y=(i+1)*a.LINE_WIDTH+i*a.CELL_WIDTH+a.OFFSET.y;for(var n=e.x[0];n<e.x[1];n++)t.x=(n+1)*a.LINE_WIDTH+n*a.CELL_WIDTH+a.OFFSET.x,a.ctx.moveTo(t.x,t.y),t.x+=a.CELL_WIDTH,this.maze[i][n].walls[0]?a.ctx.lineTo(t.x,t.y):a.ctx.moveTo(t.x,t.y),t.y+=a.CELL_WIDTH,this.maze[i][n].walls[1]?a.ctx.lineTo(t.x,t.y):a.ctx.moveTo(t.x,t.y),t.x-=a.CELL_WIDTH,this.maze[i][n].walls[2]?a.ctx.lineTo(t.x,t.y):a.ctx.moveTo(t.x,t.y),t.y-=a.CELL_WIDTH,this.maze[i][n].walls[3]?a.ctx.lineTo(t.x,t.y):a.ctx.moveTo(t.x,t.y),t.x+=a.CELL_WIDTH}a.ctx.stroke()},t}();e.default=h},778:function(t,e,i){var a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var n=i(607),h=a(i(137)),r=function(){function t(){this.phasing=!1,this.x=Math.round(n.canvas.width/2),this.y=Math.round(n.canvas.height/2),this.width=n.CELL_WIDTH/2,this.height=n.CELL_WIDTH/2}return t.prototype.getCurrentCoordinates=function(){return{x:Math.ceil((-n.OFFSET.x-n.LINE_WIDTH)/(n.LINE_WIDTH+n.CELL_WIDTH)+Math.floor(n.canvas.width/(n.CELL_WIDTH+n.LINE_WIDTH)/2)),y:Math.round((-n.OFFSET.y-n.LINE_WIDTH)/(n.LINE_WIDTH+n.CELL_WIDTH))+Math.floor(n.canvas.height/(n.CELL_WIDTH+n.LINE_WIDTH)/2)}},t.prototype.checkForColour=function(t){for(var e=[n.ctx.getImageData(this.x+n.CELL_WIDTH/2,this.y-(n.SPEED+1),1,1),n.ctx.getImageData(this.x+n.CELL_WIDTH+n.SPEED+1,this.y+n.CELL_WIDTH/2,1,1),n.ctx.getImageData(this.x+n.CELL_WIDTH/2,this.y+n.CELL_WIDTH+n.SPEED+1,1,1),n.ctx.getImageData(this.x-(n.SPEED+1),this.y+n.CELL_WIDTH/2,1,1)],i=0;i<e.length;i++)if(e[i].data.toString()===t)return!0;return!1},t.prototype.update=function(){if((n.keys.w||n.keys.ArrowUp)&&(n.checkForWall(this.x,this.y,this.width,-n.SPEED)&&!this.phasing||(n.OFFSET.y+=n.SPEED)),(n.keys.a||n.keys.ArrowLeft)&&(n.checkForWall(this.x,this.y,-n.SPEED,this.width)&&!this.phasing||(n.OFFSET.x+=n.SPEED)),(n.keys.s||n.keys.ArrowDown)&&(n.checkForWall(this.x,this.y+this.width,this.width,n.SPEED)&&!this.phasing||(n.OFFSET.y-=n.SPEED)),(n.keys.d||n.keys.ArrowRight)&&(n.checkForWall(this.x+this.width,this.y,n.SPEED,this.width)&&!this.phasing||(n.OFFSET.x-=n.SPEED)),this.checkForColour("255,0,0,255")&&n.showMenu(),this.checkForColour("0,0,255,255")){var t=n.entities[1],e=this.getCurrentCoordinates();if(t instanceof h.default)for(var i=0;i<t.phazors.length;i++)if(Math.abs(t.phazors[i][0]-e.x)+Math.abs(t.phazors[i][1]-e.y)<4){t.phazors.splice(i,1);var a=n.coordinatesToOffset(Math.round(Math.random()*(n.entities[1].width-1)),Math.round(Math.random()*(n.entities[1].height-1)));n.OFFSET.x=a.x,n.OFFSET.y=a.y;break}}n.keys["="]&&(this.phasing=!0),n.keys["="]||(this.phasing=!1)},t.prototype.draw=function(){n.ctx.fillRect(this.x,this.y,this.width,this.width)},t}();e.default=r},236:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Cell=e.generateEllers=void 0;var i=function(t){this.walls=[!0,!0,!0,!0],this.set=t};e.Cell=i;var a=function(t){for(var e=[],a=0;a<t;a++)e.push(new i(-1));return e};e.generateEllers=function(t,e){for(var n=0,h=[],r=[],o=[],s=0;s<t;s++)o.push(new i(n)),n+=1;for(var l=0;l<e;l++){if(l==e-1){for(s=1;s<t;s++)o[s].set!=o[s-1].set&&(o[s].walls[3]=!1,o[s-1].walls[1]=!1);r.push(o);break}for(s=1;s<t;s++)Math.random()<.5&&(o[s].set=o[s-1].set,o[s].walls[3]=!1,o[s-1].walls[1]=!1);o.forEach((function(t){h.includes(t.set)||h.push(t.set)}));var E=a(t);for(l==e&&(h=[]);h.length>0;)for(s=0;s<t;s++)h.includes(o[s].set)&&Math.random()<.3&&(o[s].walls[2]=!1,E[s].walls[0]=!1,E[s].set=o[s].set,h.splice(h.indexOf(o[s].set),1));E=E.map((function(t){return-1==t.set&&(n+=1,t.set=n),t})),r.push(o),o=E}return r}},607:function(t,e,i){var a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.coordinatesToOffset=e.playing=e.checkForWall=e.entities=e.showMenu=e.keys=e.SPEED=e.OFFSET=e.canvas=e.ctx=e.LINE_WIDTH=e.CELL_WIDTH=void 0;var n=a(i(137)),h=a(i(778));console.log("Cheat: Hold = to phase through walls"),e.CELL_WIDTH=40,e.LINE_WIDTH=1;var r={x:0,y:0};e.OFFSET=r;var o=4;e.SPEED=o,navigator.userAgent.indexOf("Firefox")>-1&&(e.SPEED=o=8);var s=!0;e.playing=s;var l=document.getElementsByTagName("canvas")[0];e.canvas=l;var E=l.getContext("2d");if(!(E=l.getContext("2d")))throw new Error("2d context not supported");var d=E;e.ctx=d;var c=document.getElementById("start");if(null==c)throw new Error("Render button first");var u=c,f=document.getElementById("afterMenu");if(null==f)throw new Error("Render");var L=f,T={};e.keys=T;var y=[];e.entities=y,e.checkForWall=function(t,e,i,a){for(var n=d.getImageData(t,e,i,a).data,h=0;h<n.length;h++)if(0!=n[h])return!0;return!1},e.coordinatesToOffset=function(t,e){return{x:l.width/2-(41*t+1),y:l.height/2-(41*e+1)+40/3}};var x=function(){y.forEach((function(t){t.update()})),d.clearRect(0,0,l.width,l.height),y.forEach((function(t){t.draw()})),s&&requestAnimationFrame(x)};u.addEventListener("click",(function(){u.style.visibility="hidden",x()})),e.showMenu=function(){e.playing=s=!1,L.style.visibility="visible"},L.addEventListener("click",(function(){e.OFFSET=r={x:0,y:0},e.entities=y=[new h.default,new n.default(Math.round(1.2*y[1].width),Math.round(1.2*y[1].height))],L.style.visibility="hidden",e.playing=s=!0,d.clearRect(0,0,l.width,l.height),x()})),window.addEventListener("keydown",(function(t){T[t.key]=!0})),window.addEventListener("keyup",(function(t){T[t.key]=!1})),l.height=window.innerHeight,l.width=window.innerWidth,e.entities=y=[new h.default,new n.default],e.OFFSET=r={x:0,y:0},(new n.default).draw()}},e={};!function i(a){if(e[a])return e[a].exports;var n=e[a]={exports:{}};return t[a].call(n.exports,n,n.exports,i),n.exports}(607)})();