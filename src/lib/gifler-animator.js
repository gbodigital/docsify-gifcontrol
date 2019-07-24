export function getCanvasElement(selector) {
  var element, ref;
  if (typeof selector === 'string' && ((ref = (element = document.querySelector(selector))) != null ? ref.tagName : void 0) === 'CANVAS') {
    return element;
  } else if ((selector != null ? selector.tagName : void 0) === 'CANVAS') {
    return selector;
  } else {
    throw new Error('Unexpected selector type. Valid types are query-selector-string/canvas-element');
  }
};


/*
Creates a buffer canvas element since it is much faster to putImage than
putImageData.

The omggif library decodes the pixels into the full gif dimensions. We only
need to store the frame dimensions, so we offset the putImageData call.
 */

export function createBufferCanvas(frame, width, height) {
  var bufferCanvas, bufferContext, imageData;
  bufferCanvas = document.createElement('canvas');
  bufferContext = bufferCanvas.getContext('2d');
  bufferCanvas.width = frame.width;
  bufferCanvas.height = frame.height;
  imageData = bufferContext.createImageData(width, height);
  imageData.data.set(frame.pixels);
  bufferContext.putImageData(imageData, -frame.x, -frame.y);
  return bufferCanvas;
};


/*
Decodes the pixels for each frame (decompressing and de-interlacing) into a
Uint8ClampedArray, which is suitable for canvas ImageData.
 */

export function decodeFrames(reader, frameIndex) {
  var j, ref, results;
  return (function () {
    results = [];
    for (var j = 0, ref = reader.numFrames(); 0 <= ref ? j < ref : j > ref; 0 <= ref ? j++ : j--) {
      results.push(j);
    }
    return results;
  }).apply(this).map((function (_this) {
    return function (frameIndex) {
      var frameInfo;
      frameInfo = reader.frameInfo(frameIndex);
      frameInfo.pixels = new Uint8ClampedArray(reader.width * reader.height * 4);
      reader.decodeAndBlitFrameRGBA(frameIndex, frameInfo.pixels);
      return frameInfo;
    };
  })(this));
};

export class Animator {
  constructor(reader) {
    var ref;
    this.reader = reader;
    ref = this.reader
    this.width = ref.width
    this.height = ref.height;
    this.frames = decodeFrames(this.reader);
    this.loopCount = this.reader.loopCount();
    this.loops = 0;
    this.frameIndex = 0;
    this.running = false;
  }

  start() {
    this.lastTime = new Date().valueOf();
    this.delayCompensation = 0;
    this.running = true;
    setTimeout(this.nextFrame.bind(this), 0);
    return this;
  }

  stop() {
    this.running = false;
    return this;
  }

  reset() {
    this.frameIndex = 0;
    this.loops = 0;
    return this;
  }

  nextFrame() {
    requestAnimationFrame(this.nextFrameRender.bind(this));
  }

  firstFrameRender() {
    var frame, ref;
    frame = this.frames[this.frameIndex];
    if ((ref = this.onFrame) != null) {
      ref.apply(this, [frame, this.frameIndex]);
    }
    return this.enqueueNextFrame();
  }

  nextFrameRender() {
    var frame, ref;
    if (!this.running) {
      return;
    }
    frame = this.frames[this.frameIndex];
    if ((ref = this.onFrame) != null) {
      ref.apply(this, [frame, this.frameIndex]);
    }
    return this.enqueueNextFrame();
  }

  advanceFrame() {
    this.frameIndex += 1;
    if (this.frameIndex >= this.frames.length) {
      if (this.loopCount !== 0 && this.loopCount === this.loops) {
        this.stop();
      } else {
        this.frameIndex = 0;
        this.loops += 1;
      }
    }
  }

  enqueueNextFrame() {
    var actualDelay, delta, frame, frameDelay;
    this.advanceFrame();
    while (this.running) {
      frame = this.frames[this.frameIndex];
      delta = new Date().valueOf() - this.lastTime;
      this.lastTime += delta;
      this.delayCompensation += delta;
      frameDelay = frame.delay * 10;
      actualDelay = frameDelay - this.delayCompensation;
      this.delayCompensation -= frameDelay;
      if (actualDelay < 0) {
        this.advanceFrame();
        continue;
      } else {
        setTimeout(this.nextFrame.bind(this), actualDelay);
        break;
      }
    }
  }

  animateInCanvas(canvas, setDimension) {
    var ctx;
    if (setDimension == null) {
      setDimension = true;
    }
    if (setDimension) {
      canvas.width = this.width;
      canvas.height = this.height;
      canvas.parentNode.style.width = this.width + 'px';
      canvas.parentNode.style.height = this.height+'px';
    }
    ctx = canvas.getContext('2d');
    if (this.onDrawFrame == null) {
      this.onDrawFrame = function (ctx, frame, i) {
        return ctx.drawImage(frame.buffer, frame.x, frame.y);
      }
    }
    if (this.onFrame == null) {
      this.onFrame = (function (_this) {
        return function (frame, i) {
          var ref, saved;
          if (frame.buffer == null) {
            frame.buffer = createBufferCanvas(frame, _this.width, _this.height);
          }
          if (typeof _this.disposeFrame === "function") {
            _this.disposeFrame();
          }
          switch (frame.disposal) {
            case 2:
              _this.disposeFrame = function () {
                return ctx.clearRect(0, 0, canvas.width, canvas.height);
              }
              break;
            case 3:
              saved = ctx.getImageData(0, 0, canvas.width, canvas.height);
              _this.disposeFrame = function () {
                return ctx.putImageData(saved, 0, 0);
              }
              break;
            default:
              _this.disposeFrame = null;
          }
          return (ref = _this.onDrawFrame) != null ? ref.apply(_this, [ctx, frame, i]) : void 0;
        }
      })(this);
    }
    //this.start();
    this.firstFrameRender()
    return this;
  }
}