//--------------------------------------------------------------------------------------------------------  
var MIN_SCALE = 1; // 1=scaling when first loaded
var MAX_SCALE = 8;

// HammerJS fires "pinch" and "pan" events that are cumulative in nature and not
// deltas. Therefore, we need to store the "last" values of scale, x and y so that we can
// adjust the UI accordingly. It isn't until the "pinchend" and "panend" events are received
// that we can set the "last" values.

// Our "raw" coordinates are not scaled. This allows us to only have to modify our stored
// coordinates when the UI is updated. It also simplifies our calculations as these
// coordinates are without respect to the current scale.

var imgWidth = null;
var imgHeight = null;
var viewportWidth = null;
var viewportHeight = null;
var scale = null;
var lastScale = null;
var container = null;
var modalImg = null
var x = 0;
var lastX = 0;
var y = 0;
var lastY = 0;
var pinchCenter = null;

// We need to disable the following event handlers so that the browser doesn't try to
// automatically handle our image drag gestures.
var disableImgEventHandlers = function () {
  var events = ['onclick', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'ondblclick', 'onfocus', 'onblur'];

  events.forEach(function (event) {
    modalImg[event] = function () {
      return false;
    };
  });
};

// Traverse the DOM to calculate the absolute position of an element
var absolutePosition = function (el) {
  var x = 0, y = 0;

  while (el !== null) {
    x += el.offsetLeft;
    y += el.offsetTop;
    el = el.offsetParent;
  }
  return { x: x, y: y };
};

var restrictScale = function (scale) {
  if (scale < MIN_SCALE) {
    scale = MIN_SCALE;
  } else if (scale > MAX_SCALE) {
    scale = MAX_SCALE;
  }

  return scale;
};

var restrictRawPos = function (pos, viewportDim, imgDim) {
  if (pos < viewportDim/scale - imgDim) { // too far left/up?
    pos = viewportDim/scale - imgDim;
  } else if (pos > 0) { // too far right/down?
    pos = 0;
  }
  return pos;
};

var updateLastPos = function (deltaX, deltaY) {
  lastX = x;
  lastY = y;
};

var translate = function (deltaX, deltaY) {
  // We restrict to the min of the viewport width/height or current width/height as the
  // current width/height may be smaller than the viewport width/height
  var newX = restrictRawPos(lastX + deltaX/scale,
                            Math.min(viewportWidth, curWidth), imgWidth);
  x = newX;
  modalImg.style.marginLeft = Math.ceil(newX*scale) + 'px';

  var newY = restrictRawPos(lastY + deltaY/scale,
                            Math.min(viewportHeight, curHeight), imgHeight);
  y = newY;
  modalImg.style.marginTop = Math.ceil(newY*scale) + 'px';
};

var zoom = function (scaleBy) {
  scale = restrictScale(lastScale*scaleBy);

  curWidth = imgWidth*scale;
  curHeight = imgHeight*scale;
  modalImg.style.width = Math.ceil(curWidth) + 'px';
  modalImg.style.height = Math.ceil(curHeight) + 'px';

  // Adjust margins to make sure that we aren't out of bounds
  translate(0, 0);
};

var rawCenter = function (e) {
  var pos = absolutePosition(container);

  // We need to account for the scroll position
  var scrollLeft = window.pageXOffset ? window.pageXOffset : document.body.scrollLeft;
  var scrollTop = window.pageYOffset ? window.pageYOffset : document.body.scrollTop;

  var zoomX = -x + (e.center.x - pos.x + scrollLeft)/scale;
  var zoomY = -y + (e.center.y - pos.y + scrollTop)/scale;

  return { x: zoomX, y: zoomY };
};

var updateLastScale = function () {
  lastScale = scale;
};

var zoomAround = function (scaleBy, rawZoomX, rawZoomY, doNotUpdateLast) {
  // Zoom
  zoom(scaleBy);

  // New raw center of viewport
  var rawCenterX = -x + Math.min(viewportWidth, curWidth)/2/scale;
  var rawCenterY = -y + Math.min(viewportHeight, curHeight)/2/scale;

  // Delta
  var deltaX = (rawCenterX - rawZoomX)*scale;
  var deltaY = (rawCenterY - rawZoomY)*scale;

  // Translate back to zoom center
  //translate(deltaX, deltaY);

  if (!doNotUpdateLast) {
  updateLastScale();
  updateLastPos();
  //console.log(2);
  }
};

var zoomCenter = function (scaleBy, bool) {

  // Center of viewport
  var zoomX = -x + Math.min(viewportWidth, curWidth)/2/scale;
  var zoomY = -y + Math.min(viewportHeight, curHeight)/2/scale;

  zoomAround(scaleBy, zoomX, zoomY, bool);
};

var zoomIn = function () {
  zoomCenter(1.10, false); //Adjust this number to set how much you scale in and out
  //console.log("zoomin " + scale);
};
var zoomOut = function () {
  zoomCenter(.90, false); //Adjust this number to set how much you scale in and out .07 will zoom out all the way 1 will not zoom out
  //console.log("zoomout " + scale);
};


var viewImg = function () {

  //console.log("onload");
  //console.log("scale " + scale);
  modalImg = document.getElementById("pinch-zoom-image-id");
  container = modalImg.parentElement;

  disableImgEventHandlers();

  imgWidth = modalImg.width;
  imgHeight = modalImg.height;
  viewportWidth =modalImg.parentElement.offsetWidth;
  scale = viewportWidth/imgWidth;
  lastScale = scale;
  viewportHeight = modalImg.parentElement.offsetHeight;
  curWidth = imgWidth*scale;
  curHeight = imgHeight*scale;

  var hammer = new Hammer.Manager(container, {
    domEvents: true
  });

  hammer.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
  hammer.add(new Hammer.Pinch());
 
  hammer.get('pinch').set({
    enable: true
  });


  //console.log("translate");
  hammer.on('pan', function (e) {
    translate(e.deltaX, e.deltaY);
  });

  hammer.on('panend', function (e) {
    updateLastPos();
      //console.log(3);//this pan action gets run for  each time the modal is opened up.
  });

  hammer.on('pinch', function (e) {

    // We only calculate the pinch center on the first pinch event as we want the center to
    // stay consistent during the entire pinch
    if (pinchCenter === null) {
      pinchCenter = rawCenter(e);
      var offsetX = pinchCenter.x*scale - (-x*scale + Math.min(viewportWidth, curWidth)/2);
      var offsetY = pinchCenter.y*scale - (-y*scale + Math.min(viewportHeight, curHeight)/2);
      pinchCenterOffset = { x: offsetX, y: offsetY };
    }

    // When the user pinch zooms, she/he expects the pinch center to remain in the same
    // relative location of the screen. To achieve this, the raw zoom center is calculated by
    // first storing the pinch center and the scaled offset to the current center of the
    // image. The new scale is then used to calculate the zoom center. This has the effect of
    // actually translating the zoom center on each pinch zoom event.
    var newScale = restrictScale(scale*e.scale);
    var zoomX = pinchCenter.x*newScale - pinchCenterOffset.x;
    var zoomY = pinchCenter.y*newScale - pinchCenterOffset.y;
    var zoomCenter = { x: zoomX/newScale, y: zoomY/newScale };

    zoomAround(e.scale, zoomCenter.x, zoomCenter.y, true);
  });

  hammer.on('pinchend', function (e) {
    updateLastScale();
    updateLastPos();
    //console.log(4);
    pinchCenter = null;
  });

  //close modal and reset the hammer object
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal, destroy the hammer so it doesnt register 
  //the movement twice, zoom out to refresh scale when opening a new image
  span.onclick = function() {
    hammer.destroy();
    //console.log("destroy");
    zoomCenter(.08, true);
    //console.log("zoom out.  scale " + scale);
    document.getElementById("myModal").style.display = "none";      
  }
};