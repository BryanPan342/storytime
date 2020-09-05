function min(a, b) {
  return a < b ? a : b;
}

function addDims(element) {
  maxDimsForIds[element.getAttribute('id')] = { 'width': element.offsetWidth, 'height': element.offsetHeight };
}

function storeImgs() {
  for (var e = document.getElementsByTagName('img'), t = 0; t < e.length; t++){
    "ocean-bubbles" === e[t].getAttribute('class') && ocean_bubbles.push(e[t]) && addDims(e[t]),
    "light-coral" === e[t].getAttribute('class') && light_corals.push(e[t]) && addDims(e[t]),
    "dark-coral" === e[t].getAttribute('class') && dark_corals.push(e[t]) && addDims(e[t]),
    "polyps" === e[t].getAttribute('class') && polypses.push(e[t]) && addDims(e[t]);
  }
}

function storeDivs() {
  for (var e = document.getElementsByTagName('div'), t = 0; t < e.length; t++) {
    "layer" === e[t].getAttribute('class') && layers.push(e[t]) && addDims(e[t]);
  }
}

var maxDimsForIds = new Object;
var classMultipliers = {
  'ocean-bubbles': 1,
  'light-coral': .74,
  'dark-coral': .74,
  'polyps': .266,
};
var layers = new Array, ocean_bubbles = new Array, light_corals = new Array, dark_corals = new Array, polypses = new Array;

function resize() {
  console.log('resizing');
  Object.keys(maxDimsForIds).map((key) => {
    const e = maxDimsForIds[key];
    let element = document.getElementById(key);
    console.log(element);
    const m = classMultipliers[element.getAttribute('class')];
    if (m) {
      element.style.width = `${min(e['width'], screen.width * m)}px`;
      element.style.height = `${min(e['height'], screen.height* m)}px`;
    }
  });
}

window.onload = function() {
  storeDivs(), storeImgs(), resize();
}
window.onresize = resize;

// function handleScroll() {
//   var scrollLeft = window.pageXOffset;
//   document.getElementById("ocean-background-bubbles").style.left = `${scrollLeft*.5}px`;
// };

// window.addEventListener('scroll', handleScroll, { passive: true });