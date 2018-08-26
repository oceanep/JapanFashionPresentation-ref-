'use strict';

window.onload = function(){}

document.addEventListener('DOMContentLoaded',function(e){
  //assign all event handlers
  var historyCircle = document.getElementById('first');
  var fashionCircle = document.getElementById('second');
  var circleTabs = document.getElementsByClassName('circle-tab');
  var homeTabs = document.getElementsByClassName('tab-home');

  for (var i = 0; i < circleTabs.length; i++){
   homeTabs[i].addEventListener('click',scrollHome,false);
   circleTabs[i].addEventListener('click',smoothScroll,false);
  }
  historyCircle.addEventListener('click',slideOpen,false);
  historyCircle.addEventListener('click',function(){
    shiftCircle('left');
  },false);

  fashionCircle.addEventListener('click', slideOpen);
  fashionCircle.addEventListener('click',function(){
    shiftCircle('right');
  },false);

});


//slide open circles
function slideOpen(){

  if(this.classList.contains('clicked')){
    this.classList.remove('clicked');
  }
  else{
    this.classList.add('clicked');
  }
}

//smooth scrolling function cause jquery is buns

function getPageScroll() {
  var yScroll;

  if (window.pageYOffset) {
    yScroll = window.pageYOffset;
  } else if (document.documentElement && document.documentElement.scrollTop) {
    yScroll = document.documentElement.scrollTop;
  } else if (document.body) {
    yScroll = document.body.scrollTop;
  }
  return yScroll;
}

function smoothScroll() {
  var id = this.id.split('-')[1];
  var targetOffset, currentPosition,
      body = document.body,
      animateTime = 500;
  var scroll = function () {
    body.classList.remove('in-transition');
    body.style.cssText = '';
    window.scrollTo(0, targetOffset);
  };

  document.getElementById(id).style.display = 'block';

  targetOffset = document.getElementById(id).offsetTop;
  currentPosition = getPageScroll();

  body.classList.add('in-transition');
  body.style.WebkitTransform = 'translate(0, -' + (targetOffset - currentPosition) + 'px)';
  body.style.MozTransform = 'translate(0, -' + (targetOffset - currentPosition) + 'px)';
  body.style.transform = 'translate(0, -' + (targetOffset - currentPosition) + 'px)';

  window.setTimeout(scroll, animateTime);

}

//smooth scroll home
function scrollHome(){
  var targetOffset, currentPosition,
      body = document.body,
      animateTime = 500;

  var parent = this.parentNode;
  targetOffset = document.getElementById('home').offsetTop;
  currentPosition = getPageScroll();
  var scroll2 = function () {
    body.classList.remove('in-transition');
    body.style.cssText = '';
    window.scrollTo(0, targetOffset);
    parent.parentNode.style.display = '';
  };

  body.classList.add('in-transition');
  body.style.WebkitTransform = 'translate(0, +' + (currentPosition - targetOffset)+ 'px)';
  body.style.MozTransform = 'translate(0, +' + (currentPosition - targetOffset)+ 'px)';
  body.style.transform = 'translate(0, +' + (currentPosition - targetOffset) + 'px)';

  window.setTimeout(scroll2, animateTime);
}

//Function to convert unit circle positions into graph based percentages
function convertToPercent(fraction) {
return (fraction * 100) + '%';
}

function getPoint(inc,radius) {
    var angle = inc * Math.PI * 2;
      return {
          x: radius * Math.cos(angle),
          y: radius * Math.sin(angle)
  }
}

function compensate(perc,y1,y2){

    var comp = (perc * y1);

    return +((comp.toFixed(2)));

}

function calculatePercY(y1,y2,ch,r){
  var pixelAmt = ((y1-y2) - (ch));
  var perc = pixelAmt/(2*r)
  return +(perc.toFixed(2));
}

function calculatePercX(x1,x2,ch,r){
  var pixelAmt = ((x1+x2) - (ch));
  var perc = pixelAmt/(2*r)
  return +(perc.toFixed(2));
}

function moveCircles(inc, offsetX = 0, offsetY = 0, side){
  var circleRadius = document.getElementById('circle').clientWidth/2;
  var outerRadius = (circleRadius * .4) + circleRadius;

  var circles = document.getElementsByClassName(side+'-circle');
  var _inc = inc;
  var compX, compY;
  var circCoord = {};
  var xy = {};
  var coord = [];

  for (var i = 0; i < circles.length; i++){
    xy = getPoint(_inc,outerRadius);

    compX = compensate(.25,circleRadius,xy.x);
    compY = compensate(.25,circleRadius,xy.y);

    circCoord = {
      'left': calculatePercX(circleRadius,xy.x,compX,circleRadius),
      'top': calculatePercY(circleRadius,xy.y,compY,circleRadius)
    };

    coord[i] = circCoord;

    circles[i].style.top = convertToPercent((circCoord.top + offsetY));

    circles[i].style.left = convertToPercent((circCoord.left - offsetX));

    _inc += .0625;
  }

}

function hideCircles(side){
  var circles = document.getElementsByClassName(side+'-circle');

  for (var i = 0; i < circles.length; i++){
    circles[i].style.top = null;

    circles[i].style.left = null;
  }
}

function shiftCircle(side){
  var inc, offSetY, offSetX;
  var circles = document.getElementsByClassName(side+'-circle');

  if(side == 'right'){
    inc = .75;
    offSetY = -.2;
    offSetX = -.2;
  }
  if(side == 'left'){
    inc = .25;
    offSetY = .19;
    offSetX = .2;
  }

  if (circles[0].classList.contains('display')){
    for (var i = 0; i < circles.length; i++){circles[i].classList.remove('display');}
    hideCircles(side);
  }else{

    for (var i = 0; i < circles.length; i++){circles[i].classList.add('display');}
    moveCircles(inc,offSetX,offSetY,side);
  }

}
