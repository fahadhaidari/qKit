// ---------------- qKit ----------------
// Author: Fahad Haidari

const qKit = (function() {
  let canvas;
  let context;
  let isPause = false;
  let update = () => {};
  let clicked = () => {};
  let mouseMove = () => {};
  let keyDown = () => {};
  let keyUp = () => {};
  const audio = new Audio();
  const views = [];
  const texts = [];
  const entities = {};
  const defaults = {
    canvas: {
      color: '#222222',
      width: 400,
      height: 400,
    },
    font: {
      color: 'blue',
      family: 'Futura',
      size: 20,
    },
    colliderColor: 'blue',
    viewSize: 20,
    viewColor: '#FFFFFF',
  };

  (function() {
    canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    document.body.appendChild(canvas);
    canvas.style.display = 'block';
    canvas.style.margin = '0px auto';
    context = canvas.getContext('2d');
  })();

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.x;
    const mouseY = e.clientY - rect.y;
    let v  = null;

    // this is a sequential search
    // needs to implement a faster search

    let i = 0;
    for (i = 0, len = views.length; i < len; i++) {
      v = views[i];
      if (!v.isRender) continue;
      if (v.type === 'line') continue;

      if (mouseX > v.x && mouseX < v.x + v.width &&
          mouseY > v.y && mouseY < v.y + v.height)
          {
            break;
          } else {
            v = null;
          }
    }
    clicked({
      mouseX,
      mouseY,
      target: v || null,
    });
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.x;
    const mouseY = e.clientY - rect.y;

    mouseMove({
      mouseX,
      mouseY
    });
  });

  document.body.addEventListener('keydown', (e) => {
    keyDown(e.keyCode);
  });

  document.body.addEventListener('keyup', (e) => {
    keyUp({
      key: e.keyCode,
    });
  });

  const sortBy = p => (a, b) => a[p] - b[p]; // layering views based on z axis

  const render = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    views.sort(sortBy("z")); // consider calling it once in a function
    // rather than calling it on each render

    if (views.length) {
      let i = 0; // reduce variable initializations in for loop

      for (i = 0, len = views.length; i < len; i++) {
        const v = views[i];
        v.draw();
      }
    }
    if (texts.length) {
      let k = 0;

      for (k = 0, len = texts.length; k < len; k++) {
        const t = texts[k];
        t.draw();
      }
    }
  };

  const frame = function(t) {
    if (!isPause) {
      update(t);
    }
    render();
    requestAnimationFrame(frame);
  };

  const protect = function(obj) {
    return new Proxy(obj, {
      set: function(obj, prop, val) {
        if (Object.keys(obj).includes(prop) || prop === 'extension') {
          obj[prop] = val;
        } else {
          throw new Error(`Cannot set property ${prop} Try ${obj}.extension.${prop}`);
        }
      }
    })
  };

  function SuperView(config, type) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.z = config.z || 0;
    this.width = config.width || defaults.viewSize;
    this.height = config.height || defaults.viewSize;
    this.alpha = config.alpha || 1;
    this.color = config.color || defaults.viewColor;
    this.isRender = config.isRender || true;
    this.isOutline = config.isOutline || false;
    this.angle = config.angle || 0;
    this.showCollider = config.showCollider || false;

    // needs faster search algorithm
    this.remove = function() {
      let i = 0;

      // const indexInGroups = entities[this.group]; // index in entities
      // for future implementaion to remove the view from entities map (groups) as well

      for (i = 0, len = views.length; i < len; i++) {
        if (views[i] === this) {
          views[i] = null;
          // this view should be removed from entities (groups) as well
          views.splice(i, 1);
          break;
        }
      }
    };

    this.distanceTo = function(t) {
      const dx = t.x - this.x;
      const dy = t.y - this.y;

      return Math.sqrt(dx * dx + dy * dy);
    };

    this.angleTo = function(t) {
      const dx = t.x - this.x;
      const dy = t.y - this.y;

      return Math.atan2(dy, dx);
    };

    this.trigsTo = function(t) {
      const dx = t.x - this.x;
      const dy = t.y - this.y;
      const angle = Math.atan2(dy, dx);

      return {
        angle: Math.atan2(dy, dx),
        distance: Math.sqrt(dx * dx + dy * dy),
        x: Math.cos(angle),
        y: Math.sin(angle),
      }
    };

    this.getTopRight = function() {
      return {
          x: this.x + this.width,
          y: this.y
      };
    };
    this.getTopLeft = function() {
      return {
        x: this.x,
        y: this.y
      };
    };
    this.getBottomRight = function() {
      return {
        x: this.x + this.width,
        y: this.y + this.height
      }
    };
    this.getBottomLeft = function() {
      return {
        x: this.x,
        y: this.y + this.height
      }
    };
    this.getTop = function() {
      return {
        x: this.x + this.width / 2,
        y: this.y
      }
    };
    this.getBottom = function() {
      return {
        x: this.x + this.width / 2,
        y: this.y + this.height
      }
    };
    this.getLeft = function() {
      return {
        x: this.x,
        y: this.y + this.height / 2
      }
    };
    this.getRight = function() {
      return {
        x: this.x + this.width / 2,
        y: this.y + this.height / 2
      }
    };
    this.getCenter = function() {
      return {
        x: this.x + this.width / 2,
        y: this.y + this.height / 2
      }
    };
    this.center = function() {
      this.x = canvas.width / 2 - this.width / 2;
      this.y = canvas.height / 2 - this.height / 2;
    };
    this.addToGroup = function(group) {
      if (!entities[group]) {
        entities[group] = [];
      }
      entities[group].push(this);
    };
    this.alignToGrid = function(size) {
      this.x = this.x - (this.x % size);
      this.y = this.y - (this.y % size);
    };

    if (config.group) {
      this.addToGroup(config.group);
    }
  };

  return {
    screen: {
      width: 0,
      height: 0,
      // needs more info for the screen object
    },
    init: function(config) {
      if (!config) config = {};
      if (!config.border) config.border = {};

      this.screen.width = canvas.width = config.width ||
      defaults.canvas.width;
      this.screen.height = canvas.height = config.height ||
      defaults.canvas.height;
      canvas.style.background = config.color || defaults.canvas.color;
      canvas.style.border = `solid ${config.border.width}px ${config.border.color}`;
      canvas.style.borderRadius = `${config.border.radius}px`;
      const vertCenter = window.innerHeight / 2;
      canvas.style.marginTop = `${(vertCenter - (canvas.height / 2))}px`;

      frame(); // will start the main loop
    },
    draw: {
      spriteSheet: function(config) {
        if (!config) config = {};

        const img = new Image();

        img.src = config.src; // spritesheet src

        if (!(config.width || config.height)) {
          throw new Error('Spritesheet width and height should be provided');
        }

        const width = config.frameWidth || (config.width / config.cols); // frame width
        const height = config.frameHeight || (config.height / config.rows); // frame height
        const animation = {};

        return {
          movieClip: function(config) {
            const name = config.name;

            if (!animation[name]) {
              animation[name] = {};
            }
            animation[name].frames = config.frames || [];
            animation[name].len = config.frames.length || 0;
            animation[name].isLoop = config.isLoop,
            animation[name].isReturnToDefaultMovieClip = config.isReturnToDefaultMovieClip; // if true
            // animation will fall back to defaultAnimName
          },
          removeMovieClip: function(name) {
            if (!animation[name]) throw new Error(`MovieClip ${name} does not exist`);
            delete animation[name];
          },
          add: function(config) { // create new sprite
            if (!config) config = {};

            // default MovieClip when adding a new sprite
            const { movieClip } = config;
            const animName = movieClip.name;
            const defaultAnimName = animName;

            animation[defaultAnimName] = {
              frames: movieClip.frames,
              len: movieClip.frames.length || 0,
              isLoop: movieClip.isLoop,
              isReturnToDefaultMovieClip: movieClip.isReturnToDefaultMovieClip
            };

            let currentFrame = 0;
            let scale = config.scale || 1; // sprite scale
            let delayCount = 0;
            const scaledWidth = scale * width;
            const scaledHeight = scale * height;

            config.width = scaledWidth; // width of each frame
            config.height = scaledHeight; // height of each frame

            const sprite = {
              animation: {},
              animName: animName,
              scale: scale,
              delay: config.delay || 10,
              sx: currentFrame * width,
              sy: 0,
              sw: width,
              sh: height,
              dx: config.x || 0,
              dy: config.y || 0,
              x: config.x || 0,
              y: config.y || 0,
              z: config.z,
              row: 0,
              col: 0,
              dw: scaledWidth,
              dh: scaledHeight,
              width: scaledWidth,
              height: scaledHeight,
              frame: 0,
              frameIndex: 0,
              extension: config.extension || {},
              isRender: config.isRender,
              isLoop: animation[defaultAnimName].isLoop,
              isPlay: config.isPlay || true,
              alpha: config.alpha || 1,
              angle: config.angle,
              dirX: config.dirX || 1,
              dirY: config.dirY || 1,
              showCollider: config.showCollider || false,
              playMovieClip: function(name) {
                this.animName = name;
                this.frameIndex = 0;
                this.isLoop = animation[name].isLoop;
                // this.isLoop = animation[name].isLoop;
              },
              draw: function() { // draw sprite
                if (!this.isRender) return;

                if (this.isPlay) {
                  delayCount ++;
                  if (delayCount > this.delay) {
                    delayCount = 0;
                    if (animation[this.animName]) {

                      // need to move this to a function
                      this.row = animation[this.animName].frames[this.frameIndex][0];
                      this.col = animation[this.animName].frames[this.frameIndex][1];
                    } else {
                      return;
                    }
                    this.frameIndex ++;
                    if (this.frameIndex >  animation[this.animName].len - 1) {
                      this.frameIndex = 0;
                      if (animation[this.animName].isReturnToDefaultMovieClip) {
                        this.animName = defaultAnimName;
                      }
                      if (!this.isLoop) {
                        this.isPlay = false;
                        this.frameIndex = 0;
                      }
                    }
                  }
                }

                this.sx = this.col * width;
                this.sy = this.row * height;

                if (this.showCollider) {
                  context.strokeStyle = defaults.colliderColor;
                  context.strokeRect(this.x, this.y, this.width, this.height);
                  context.stroke();
                }

                const pivotX = this.x + this.width / 2;
                const pivotY = this.y + this.height / 2;

                this.dx = this.x;
                this.dy = this.y;
                context.globalAlpha = this.alpha;

                context.translate(pivotX, pivotY);
                context.rotate(this.angle * Math.PI / 180);
                context.scale(this.dirX, this.dirY);
                context.translate(-pivotX, -pivotY);
                context.drawImage(
                  img,
                  this.sx,
                  this.sy,
                  this.sw,
                  this.sh,
                  this.dx,
                  this.dy,
                  this.dw,
                  this.dh);
                context.setTransform(1, 0, 0, 1, 0, 0);
              },
              playNextFrame: function() {
                this.frameIndex ++;
                if (this.frameIndex > animation[this.animName].len - 1) {
                  this.frameIndex = 0;
                }
                this.row = animation[this.animName].frames[this.frameIndex][0];
                this.col = animation[this.animName].frames[this.frameIndex][1];
              },
              playPreviousFrame: function() {
                this.frameIndex --;
                if (this.frameIndex < 0) {
                  this.frameIndex = animation[this.animName].len - 1;
                }
                this.row = animation[this.animName].frames[this.frameIndex][0];
                this.col = animation[this.animName].frames[this.frameIndex][1];
              }
            };

            SuperView.call(sprite, config, 'sprite');

            const protected = protect(sprite);
            views.push(protected);
            return protected;
          }
        }
      },
      image: function(config) {
        if (!config) config = {};

        const img = new Image();

        const imgObj = {
          img: img,
          x: config.x,
          y: config.y,
          z: config.z,
          width: config.width || undefined,
          height: config.height || undefined,
          angle: config.angle,
          extension: config.extension || {},
          isRender: config.isRender,
          src: config.src,
          showCollider: config.showCollider,
          draw: function() {
            if (!this.isRender) return;

            if (this.showCollider) {
              context.strokeStyle = 'white';
              context.strokeRect(this.x, this.y, this.width, this.height);
              context.stroke();
            }

            const pivotX = this.x + this.width / 2;
            const pivotY = this.y + this.height / 2;

            context.translate(pivotX, pivotY);
            context.rotate(this.angle * Math.PI / 180);
            context.translate(-pivotX, -pivotY);
            context.drawImage(this.img, this.x, this.y, this.width, this.height);
            context.globalAlpha = this.alpha;
            context.setTransform(1, 0, 0, 1, 0, 0);
          }
        };

        SuperView.call(imgObj, config, 'image');

        img.addEventListener('load', e => {
          if (!imgObj.width) {
            imgObj.width = img.width;
          }
          if (!imgObj.height) {
            imgObj.height = img.height;
          }
          views.push(imgObj);
        }, false)
        img.src = imgObj.src;

        const protected = protect(imgObj);
        return protected;
      },
      quad: function(config) {
        if (!config) config = {};
        config.type = 'quad';

        const q = {
          x: config.x,
          y: config.y,
          z: config.z,
          width: config.width,
          height: config.height,
          color: config.color,
          isOutline: config.isOutline,
          isRender: config.isRender,
          group: config.group,
          alpha: config.alpha,
          angle: config.angle,
          extension: config.extension || {},
          draw: function() {
            if (!this.isRender) return;
            const pivotX = this.x + this.width / 2;
            const pivotY = this.y + this.height / 2;

            if (this.isOutline) {
              context.strokeStyle = this.color;
              context.translate(pivotX, pivotY);
              context.rotate(this.angle * Math.PI / 180);
              context.translate(-pivotX, -pivotY);
              context.strokeRect(this.x, this.y, this.width, this.height);
              context.stroke();
            } else {
              context.translate(pivotX, pivotY);
              context.rotate(this.angle * Math.PI / 180);
              context.translate(-pivotX, -pivotY);
              context.fillStyle = this.color;
              context.fillRect(this.x, this.y, this.width, this.height);
              context.fill();
            }
            if (this.showCollider) {
              context.strokeStyle = defaults.colliderColor;
              context.strokeRect(this.x, this.y, this.width, this.height);
              context.stroke();
            }
            context.globalAlpha = this.alpha;
            context.setTransform(1, 0, 0, 1, 0, 0);
          },
        };

        SuperView.call(q, config, 'quad');

        const protected = protect(q);
        views.push(protected);
        return protected;
      },
      line: function(config) {
        if (!config) config = {};

        config.type = 'line';

        const line = {
          p1: config.p1 || {x: 0, y: 0},
          p2: config.p2 || {x: 0, y: 0},
          z: config.z || 0,
          color: config.color || '#EEEEEE',
          width: config.width || 1,
          extension: config.extension || {},
          draw: function() {
            context.strokeStyle = this.color;
            context.lineWidth = this.width;
            context.beginPath();
            context.moveTo(this.p1.x, this.p1.y);
            context.lineTo(this.p2.x, this.p2.y);
            context.stroke();
            context.closePath();
          }
        };

        const protected = protect(line);
        views.push(protected);
        return protected;
      },
      text: function(config) {
        if (!config) config = {};

        config.type = 'text';

        let _size = defaults.font.size;
        let _family = defaults.font.family;

        if (config.family) {
          _family = config.family;
        }
        if (config.size) {
          _size = config.size;
        }

        const t = {
          x: config.x,
          y: config.y,
          z: config.z,
          alpha: config.alpha,
          text: config.text,
          color: config.color,
          family: _family,
          size: _size,
          isRender: true,
          extension: config.extension || {},
          draw: function() {
            if (!this.isRender) return;

            context.fillStyle = this.color;
            context.font = `${this.size}px ${this.family}`;
            context.textAlign = "left";
            context.fillText(this.text, this.x, this.y + 20);
          }
        };

        SuperView.call(t, config, 'text');

        const protected = protect(t);
        texts.push(protected);
        return protected;
      },
    },
    collision: {
      // collision needs to respect forces added to
      test: function(o1, o2) {
        if (o1.x + o1.width < o2.x || o1.x > o2.x + o2.width ||
          o1.y + o1.height < o2.y || o1.y > o2.y + o2.height) {
            return false;
          }
          return true;
      }
    },
    groups: function(name) {
      return entities[name];
    },
    repeat: function(callback, n) {
      let i = 0; // reduce variable initializations in for loop

      for (i = 0; i < n; i++) {
        callback(i);
      }
    },
    sound: {
      play: function(src) {
        audio.src = src;
        audio.play();
      }
    },
    util: {
      randomInt: function(min, max) {
        return parseInt(Math.random() * (max - min) + min);
      },
      randomDouble: function(min, max) {
        return Math.random() * (max - min) + min;
      },
      randomColor: function() {
        return '#' + Math.random().toString(16).substr(-6);
      },
      getDistance: function(p1, p2) {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;

        return Math.sqrt(dx * dx + dy * dy);
      },
      getAngle: function(p1, p2) { // angle in readians
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;

        return Math.atan2(dy, dx);
      },
      getTrigs: function(p1, p2) { // trigs components
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const angle = Math.atan2(dy, dx);

        return {
          angle: Math.atan2(dy, dx),
          distance: Math.sqrt(dx * dx + dy * dy),
          x: Math.cos(angle),
          y: Math.sin(angle),
        }
      }
    },
    pause: function() {
      isPause = true;
    },
    play: function() {
      isPause = false;
    },
    update: function(fn) {
      update = fn;
    },
    input: {
      click: function(fn) {
        clicked = fn;
      },
      mouseMove: function(fn) {
        mouseMove = fn;
      },
      keyDown: function(fn) {
        keyDown = fn;
      },
      keyUp: function(fn) {
        keyUp = fn;
      }
    }
  }
})();
