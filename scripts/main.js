function min(a, b) {
  return a < b ? a : b;
}

var ocean_bubbles = document.getElementsByClassName("ocean-bubbles");
var light_corals = document.getElementsByClassName("light-coral");
var dark_corals = document.getElementsByClassName("dark-coral");
var polypses = document.getElementsByClassName("polyps");

function resize() {
  var bubble_width = min(600, screen.width);
  var coral_width = min(475, screen.width * .74 );
  var polyps_width = min(250, screen.width * .266 );

  Array.from(ocean_bubbles).forEach(function (bubble) { 
    bubble.style.width =`${bubble_width}px`;
  }); 
  Array.from(light_corals).forEach(function (coral) {
    coral.style.width = `${coral_width}px`;
  }); 
  Array.from(dark_corals).forEach(function (coral) { 
    coral.style.width =`${coral_width}px`;
  }); 
  Array.from(polypses).forEach(function (polyps) { 
    polyps.style.width =`${polyps_width}px`;
  }); 
}

resize();
window.onresize = resize;

function handleScroll() {
  var scrollLeft = window.pageXOffset
  Array.from(document.getElementsByClassName("parallax")).forEach(function (element) {
    console.log(scrollLeft); 
    element.style.transform = `translateX(${scrollLeft*.1}px)`;
  }); 
};

window.addEventListener('scroll', handleScroll, { passive: true });