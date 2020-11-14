function min(a, b) { return a < b ? a : b; };
function enableScroll() { canScroll = true; }
function disableScroll() { canScroll = false; }
function touchStart(e) {
  startTouchPosition = e.targetTouches[0].pageY;
}
function touchMove(e) {
  canScroll && scroll((e.targetTouches[0].pageY - startTouchPosition) / 5);
}
function touchEnd(e) {
  e.preventDefault();
  startTouchPosition = 0;
}
function initTouchEvents() {
  document.addEventListener("touchstart", touchStart, !1),
  document.addEventListener("touchmove", touchMove, !1),
  document.addEventListener("touchEnd", touchEnd, !1);
}

function addDims(element) {
  const height = element.offsetHeight;
  const width = element.offsetWidth;
  const widthMultiplier = width / height;
  maxDimsForIds[element.getAttribute('id')] = {'width': width, 'widthMultiplier': widthMultiplier, 'height': height };
};

function storeImgs() {
  for (var e = document.getElementsByTagName('img'), t = 0; t < e.length; t++){
    const et = e[t];
    const div_class = et.getAttribute('class');
    "feesh" === div_class && (feesh = et) && addDims(et),
    "rocks" === div_class && rocks.push(et) && addDims(et),
    "ocean-bubbles" === div_class && ocean_bubbles.push(et) && addDims(et),
    "light-coral" === div_class && light_corals.push(et) && addDims(et),
    "dark-coral" === div_class && dark_corals.push(et) && addDims(et),
    "polyps" === div_class && polypses.push(et) && addDims(et);
  }
};

function storeDivs() {
  for (var e = document.getElementsByTagName('div'), t = 0; t < e.length; t++) {
    const et = e[t];
    const div_class = et.getAttribute('class');
    const id_class = et.getAttribute('id');
    "layer" === div_class && layers.push(et) && addDims(et),
    "text" === div_class && (texts[id_class] = et) && (isAnimated[id_class] = false);
  }
};

function resize() {
  Object.keys(maxDimsForIds).map((key) => {
    const e = maxDimsForIds[key];
    let element = document.getElementById(key);
    const m = classMultipliers[element.getAttribute('class')];
    if (m) {
      let calc_height;
      if (key == 'rocks-1') {
        calc_height =  window.innerHeight;
      } else if (key == 'polyps-2') {
        calc_height = window.innerHeight * .15;
      } else {
        calc_height = window.innerHeight * m;
      }
      const calc_width = calc_height * e.widthMultiplier;
      element.style.width = `${min(e.width, calc_width)}px`;
      element.style.height = `${min(e.height, calc_height)}px`;
    }
  });
};

function animateFirstText() {
  addAnimationToInfo('title');
}

async function addAnimationToInfo(id) {
  const div = texts[id];
  if(isAnimated[id]) return;
  Array.from(div.children).map((child, i) => i == 0 ? child.classList.add('header-animation') : child.classList.add('text-animation'));
  isAnimated[id] = true;
}

function scroll(d){
  delta = delta - d;

  if(delta < 0) delta = 0;
  else if(!isAnimated['whatisit'] && 500 < delta && delta < 1500){ addAnimationToInfo('whatisit'); }
  else if(!isAnimated['causes'] && 2000 < delta && delta < 3500){ addAnimationToInfo('causes'); }
  else if(!isAnimated['important'] && 3500 < delta && delta < 5500){ addAnimationToInfo('important'); }
  else if(!isAnimated['prevent'] && 5500 < delta && delta < 7500){ addAnimationToInfo('prevent'); }
  else if(!isAnimated['save'] && 7500 < delta && delta < 10000){ addAnimationToInfo('save'); }
  else if(delta > 10000) delta = 10000;

  layers.map((layer) => {
    layer.style.left = `${layerSpeeds[layer.getAttribute('id')] * -1 * delta}px`;
  });
};

var layerSpeeds = {
  'info-text': 1,
  'ocean-floor': 1,
  'ocean-rocks': .4,
  'ocean-bubbles': .3,
}
var classMultipliers = {
  'feesh': .25,
  'rocks': .8,
  'ocean-bubbles': 1,
  'light-coral': .54,
  'dark-coral': .54,
  'polyps': .225,
};
var isAnimated = new Object, texts = new Object, maxDimsForIds = new Object;
var layers = rocks = ocean_bubbles = light_corals = dark_corals = polypses = new Array;
var canScroll, feesh, startTouchPosition = delta = 0;

disableScroll(),
window.onload = function() {
  storeDivs(), storeImgs(), resize(), animateFirstText(), initTouchEvents(), enableScroll();
},
window.onwheel = function(e) {
  canScroll && scroll(e.wheelDelta);
},
window.onresize = resize;