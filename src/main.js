// Scrolling
var easeInQuad = new SmoothScroll('[data-easing="easeInQuad"]', {easing: 'easeInQuad'});

var dots = document.querySelectorAll(".nav li")
for (i = 0; i < dots.length; i++) {
  dots[i].addEventListener('click', function() {
    document.getElementsByClassName("active")[0].classList.remove("active");
    this.classList.add('active');
  });
}

document.onscroll = function() {

  if (isViewable(document.getElementById("section-quemsomos"))) {

    var actives = document.getElementsByClassName("active");
    if (actives.length > 0) {
      document.getElementsByClassName("nav")[0].style.opacity = 1;
      actives[0].classList.remove("active");
      document.getElementById("dot1").classList.add('active');
    }

  }
  else if (isViewable(document.getElementById("section-crenca"))) {
    var actives = document.getElementsByClassName("active");
    if (actives.length > 0) {
      document.getElementsByClassName("nav")[0].style.opacity = 1;
      actives[0].classList.remove("active");
      document.getElementById("dot2").classList.add('active');
    }

  }
  else if (isViewable(document.getElementById("section-dedicacao"))) {

    var actives = document.getElementsByClassName("active");
    if (actives.length > 0) {
      document.getElementsByClassName("nav")[0].style.opacity = 1;
      actives[0].classList.remove("active");
      document.getElementById("dot3").classList.add('active');
    }

  }
  else if (isViewable(document.getElementById("section-contato"))) {

    var actives = document.getElementsByClassName("active");
    if (actives.length > 0) {
      document.getElementsByClassName("nav")[0].style.opacity = 1;
      actives[0].classList.remove("active");
      document.getElementById("dot4").classList.add('active');
    }

  } else {
      document.getElementsByClassName("nav")[0].style.opacity = 0;
  }

};


function isViewable(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
    );
}

// Register SW.js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('service-worker.js')
    .then(function(reg) {
        console.log('Service worker Registered');
    })
    .catch(function (err) {
        console.log('erro', err);
    });
}
