function min(a, b) {
  return a < b ? a : b;
}

function addDims(element) {
  const height = element.offsetHeight;
  const width = element.offsetWidth;
  const widthMultiplier = width / height;
  maxDimsForIds[element.getAttribute('id')] = {'width': width, 'widthMultiplier': widthMultiplier, 'height': height };
}

function storeImgs() {
  for (var e = document.getElementsByTagName('img'), t = 0; t < e.length; t++){
    const et = e[t];
    "feesh" === et.getAttribute('class') && (feesh = et) && addDims(et),
    "ocean-bubbles" === et.getAttribute('class') && ocean_bubbles.push(et) && addDims(et),
    "light-coral" === et.getAttribute('class') && light_corals.push(et) && addDims(et),
    "dark-coral" === et.getAttribute('class') && dark_corals.push(et) && addDims(et),
    "polyps" === et.getAttribute('class') && polypses.push(et) && addDims(et);
  }
}

function storeDivs() {
  for (var e = document.getElementsByTagName('div'), t = 0; t < e.length; t++) {
    const et = e[t];
    "layer" === et.getAttribute('class') && layers.push(et) && addDims(et);
  }
}

var maxDimsForIds = new Object;
var classMultipliers = {
  'feesh': .25,
  'ocean-bubbles': 1,
  'light-coral': .54,
  'dark-coral': .54,
  'polyps': .20,
};
var layers = new Array, feesh, ocean_bubbles = new Array, light_corals = new Array, dark_corals = new Array, polypses = new Array;

function resize() {
  console.log('resizing');
  Object.keys(maxDimsForIds).map((key) => {
    const e = maxDimsForIds[key];
    let element = document.getElementById(key);
    
    console.log(element);
    const m = classMultipliers[element.getAttribute('class')];
    if (m) {
      const calc_height = window.innerHeight * m;
      const calc_width = calc_height * e.widthMultiplier;
      element.style.width = `${min(e.width, calc_width)}px`;
      element.style.height = `${min(e.height, calc_height)}px`;
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