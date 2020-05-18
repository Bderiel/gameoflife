// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.ts":[function(require,module,exports) {
var Grid =
/** @class */
function () {
  function Grid(x, y) {
    this.gridState = [];
    this.canvas = document.getElementById("myCanvas").getContext("2d");
    this._generation = 1;
    this.createGrid(x, y);
    this.checkState();
    this.updateCells();
  }

  ;
  Object.defineProperty(Grid.prototype, "generation", {
    set: function set(val) {
      document.querySelector('.generation').textContent = "GEN: " + val;
    },
    enumerable: false,
    configurable: true
  });
  ;
  Object.defineProperty(Grid.prototype, "alive", {
    set: function set(val) {
      document.querySelector('.alive').textContent = "Cells Alive: " + val;
    },
    enumerable: false,
    configurable: true
  });
  ;

  Grid.prototype.reset = function (x, y) {
    this.canvas.clearRect(0, 0, 1500, 800);
    this.gridState = [];
    this.createGrid(x, y);
    this.updateCells();
    this._generation = 1;
    this.generation = 1;
    window.clearInterval(this.interval);
  };

  Grid.prototype.start = function () {
    var _this = this;

    this.interval = window.setInterval(function () {
      _this.checkState();

      _this.updateCells();

      _this._generation++;
      _this.generation = _this._generation;
    }, 100);
  };

  Grid.prototype.step = function () {
    this.checkState();
    this.updateCells();
    this._generation++;
    this.generation = this._generation;
  };

  Grid.prototype.createGrid = function (x, y) {
    for (var i = 0; i < y; i++) {
      var row = [];

      for (var j = 0; j < x; j++) {
        var state = Math.floor(Math.random() * 100);
        row.push({
          state: state > 4 ? 0 : 1,
          y: i,
          x: j
        });
      }

      this.gridState.push(row);
    }
  };

  Grid.prototype.toggle = function (x, y, val, color) {
    if (val === 1) {
      this.canvas.beginPath();
      this.canvas.rect(x, y, 1, 1);
      this.canvas.fillStyle = color; //|| "white";

      this.canvas.fill();
    } else {
      this.canvas.beginPath();
      this.canvas.rect(x, y, 1, 1);
      this.canvas.fillStyle = "black";
      this.canvas.fill();
    }
  };

  Grid.prototype.checkState = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;

    var alive = 0;

    for (var i = 0; i < this.gridState.length; i++) {
      for (var j = 0; j < this.gridState[i].length; j++) {
        var cell = this.gridState[i][j];
        alive += cell.state;
        var liveNeighbors = 0;
        liveNeighbors += (_c = (_b = (_a = this.gridState) === null || _a === void 0 ? void 0 : _a[i - 1]) === null || _b === void 0 ? void 0 : _b[j]) === null || _c === void 0 ? void 0 : _c.state; //top center

        liveNeighbors += (_f = (_e = (_d = this.gridState) === null || _d === void 0 ? void 0 : _d[i - 1]) === null || _e === void 0 ? void 0 : _e[j - 1]) === null || _f === void 0 ? void 0 : _f.state; //top left

        liveNeighbors += (_j = (_h = (_g = this.gridState) === null || _g === void 0 ? void 0 : _g[i - 1]) === null || _h === void 0 ? void 0 : _h[j + 1]) === null || _j === void 0 ? void 0 : _j.state; //top right

        liveNeighbors += ((_m = (_l = (_k = this.gridState) === null || _k === void 0 ? void 0 : _k[i]) === null || _l === void 0 ? void 0 : _l[j + 1]) === null || _m === void 0 ? void 0 : _m.state) || 0; //middle right

        liveNeighbors += ((_q = (_p = (_o = this.gridState) === null || _o === void 0 ? void 0 : _o[i]) === null || _p === void 0 ? void 0 : _p[j - 1]) === null || _q === void 0 ? void 0 : _q.state) || 0; //middle left

        liveNeighbors += (_t = (_s = (_r = this.gridState) === null || _r === void 0 ? void 0 : _r[i + 1]) === null || _s === void 0 ? void 0 : _s[j]) === null || _t === void 0 ? void 0 : _t.state; //bottom center

        liveNeighbors += (_w = (_v = (_u = this.gridState) === null || _u === void 0 ? void 0 : _u[i + 1]) === null || _v === void 0 ? void 0 : _v[j - 1]) === null || _w === void 0 ? void 0 : _w.state; //bottom left

        liveNeighbors += (_z = (_y = (_x = this.gridState) === null || _x === void 0 ? void 0 : _x[i + 1]) === null || _y === void 0 ? void 0 : _y[j + 1]) === null || _z === void 0 ? void 0 : _z.state; //bottom right

        cell.liveNeighbors = liveNeighbors;
      }
    }

    this.alive = alive;
  };

  Grid.prototype.updateCells = function () {
    this.canvas.clearRect(0, 0, 400, 400); //this should clear the canvas ahead of each redraw

    for (var i = 0; i < this.gridState.length; i++) {
      for (var j = 0; j < this.gridState[i].length; j++) {
        var cell = this.gridState[i][j];

        if (cell.liveNeighbors === 3 && cell.state === 0) {
          // cell is born again 3
          cell.state = 1;
          this.toggle(j, i, cell.state, 'red');
        } else if ((cell.liveNeighbors === 2 || cell.liveNeighbors === 3) && cell.state) {
          // lives on if 2 or 3
          cell.state = 1;
          this.toggle(j, i, cell.state, 'white');
        } else if (cell.liveNeighbors > 3 && cell.state) {
          // overpopulation 
          cell.state = 0;
          this.toggle(j, i, cell.state);
        } else if (cell.liveNeighbors < 2 && cell.state) {
          // less than 2 underpop
          cell.state = 0;
          this.toggle(j, i, cell.state, 'green');
        }
      }
    }
  };

  return Grid;
}();

var grid = new Grid(1500, 800);
document.getElementsByClassName('reset')[0].addEventListener('click', function () {
  grid.reset(1500, 800);
});
document.getElementsByClassName('step')[0].addEventListener('click', function () {
  grid.step();
});
document.getElementsByClassName('start')[0].addEventListener('click', function () {
  grid.start();
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59237" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/gameOfLife.77de5100.js.map