(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.NinePatch = factory());
})(this, (function () { 'use strict';

  function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
      var i = n[a](c),
        u = i.value;
    } catch (n) {
      return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
  }
  function _asyncToGenerator(n) {
    return function () {
      var t = this,
        e = arguments;
      return new Promise(function (r, o) {
        var a = n.apply(t, e);
        function _next(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
        }
        function _throw(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
        }
        _next(void 0);
      });
    };
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return e;
    };
    var t,
      e = {},
      r = Object.prototype,
      n = r.hasOwnProperty,
      o = Object.defineProperty || function (t, e, r) {
        t[e] = r.value;
      },
      i = "function" == typeof Symbol ? Symbol : {},
      a = i.iterator || "@@iterator",
      c = i.asyncIterator || "@@asyncIterator",
      u = i.toStringTag || "@@toStringTag";
    function define(t, e, r) {
      return Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), t[e];
    }
    try {
      define({}, "");
    } catch (t) {
      define = function (t, e, r) {
        return t[e] = r;
      };
    }
    function wrap(t, e, r, n) {
      var i = e && e.prototype instanceof Generator ? e : Generator,
        a = Object.create(i.prototype),
        c = new Context(n || []);
      return o(a, "_invoke", {
        value: makeInvokeMethod(t, r, c)
      }), a;
    }
    function tryCatch(t, e, r) {
      try {
        return {
          type: "normal",
          arg: t.call(e, r)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }
    e.wrap = wrap;
    var h = "suspendedStart",
      l = "suspendedYield",
      f = "executing",
      s = "completed",
      y = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var p = {};
    define(p, a, function () {
      return this;
    });
    var d = Object.getPrototypeOf,
      v = d && d(d(values([])));
    v && v !== r && n.call(v, a) && (p = v);
    var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
    function defineIteratorMethods(t) {
      ["next", "throw", "return"].forEach(function (e) {
        define(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function AsyncIterator(t, e) {
      function invoke(r, o, i, a) {
        var c = tryCatch(t[r], t, o);
        if ("throw" !== c.type) {
          var u = c.arg,
            h = u.value;
          return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
            invoke("next", t, i, a);
          }, function (t) {
            invoke("throw", t, i, a);
          }) : e.resolve(h).then(function (t) {
            u.value = t, i(u);
          }, function (t) {
            return invoke("throw", t, i, a);
          });
        }
        a(c.arg);
      }
      var r;
      o(this, "_invoke", {
        value: function (t, n) {
          function callInvokeWithMethodAndArg() {
            return new e(function (e, r) {
              invoke(t, n, e, r);
            });
          }
          return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(e, r, n) {
      var o = h;
      return function (i, a) {
        if (o === f) throw Error("Generator is already running");
        if (o === s) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: !0
          };
        }
        for (n.method = i, n.arg = a;;) {
          var c = n.delegate;
          if (c) {
            var u = maybeInvokeDelegate(c, n);
            if (u) {
              if (u === y) continue;
              return u;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (o === h) throw o = s, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = f;
          var p = tryCatch(e, r, n);
          if ("normal" === p.type) {
            if (o = n.done ? s : l, p.arg === y) continue;
            return {
              value: p.arg,
              done: n.done
            };
          }
          "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
        }
      };
    }
    function maybeInvokeDelegate(e, r) {
      var n = r.method,
        o = e.iterator[n];
      if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
      var i = tryCatch(o, e.iterator, r.arg);
      if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
      var a = i.arg;
      return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
    }
    function pushTryEntry(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }
    function resetTryEntry(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }
    function Context(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(e) {
      if (e || "" === e) {
        var r = e[a];
        if (r) return r.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var o = -1,
            i = function next() {
              for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
              return next.value = t, next.done = !0, next;
            };
          return i.next = i;
        }
      }
      throw new TypeError(typeof e + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), o(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
    }, e.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
    }, e.awrap = function (t) {
      return {
        __await: t
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
      return this;
    }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(wrap(t, r, n, o), i);
      return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
      return this;
    }), define(g, "toString", function () {
      return "[object Generator]";
    }), e.keys = function (t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return r.reverse(), function next() {
        for (; r.length;) {
          var t = r.pop();
          if (t in e) return next.value = t, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, e.values = values, Context.prototype = {
      constructor: Context,
      reset: function (e) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (e) {
        if (this.done) throw e;
        var r = this;
        function handle(n, o) {
          return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i.completion;
          if ("root" === i.tryLoc) return handle("end");
          if (i.tryLoc <= this.prev) {
            var c = n.call(i, "catchLoc"),
              u = n.call(i, "finallyLoc");
            if (c && u) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            } else if (c) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            } else {
              if (!u) throw Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
            var i = o;
            break;
          }
        }
        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
        var a = i ? i.completion : {};
        return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.tryLoc === t) {
            var n = r.completion;
            if ("throw" === n.type) {
              var o = n.arg;
              resetTryEntry(r);
            }
            return o;
          }
        }
        throw Error("illegal catch attempt");
      },
      delegateYield: function (e, r, n) {
        return this.delegate = {
          iterator: values(e),
          resultName: r,
          nextLoc: n
        }, "next" === this.method && (this.arg = t), y;
      }
    }, e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r );
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (String )(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  var NinePatch = /*#__PURE__*/function () {
    /**
     * 构造函数 Constructor
     *
     * @param srcUrl 图片地址 The image address
     */
    function NinePatch(srcUrl) {
      _classCallCheck(this, NinePatch);
      this._srcUrl = srcUrl;
    }

    /**
     * 初始化 Init
     *
     * @returns {Promise<void>}
     */
    return _createClass(NinePatch, [{
      key: "init",
      value: (function () {
        var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return getOriginalImgContext(this._srcUrl);
              case 2:
                this._rawContext = _context.sent;
                /* 获取图片的宽高
                Get the width and height of the image */
                this._imageWidth = this._rawContext.canvas.width - 2;
                this._imageHeight = this._rawContext.canvas.height - 2;
                /* 获取 patch 数据
                 * Get patch data */
                this._horizontalPatch = getHorizontalPatch(this._rawContext);
                this._verticalPatch = getVerticalPatch(this._rawContext);
                if (this._horizontalPatch && this._verticalPatch) {
                  /* 创建临时画布，用于绘制 patch
                   * Creates a temporary canvas for drawing patches */
                  this._tempCanvas = document.createElement("canvas");
                  this._tempContext = this._tempCanvas.getContext("2d");

                  /* 计算原图中，不会被拉伸的宽高长度，即为固定的长度
                  *  In the original image, the width and height length that will not be stretched is the fixed length */
                  this._fixWidth = this._horizontalPatch.reduce(function (acc, cur) {
                    return acc + (cur < 0 ? -cur : 0);
                  }, 0);
                  this._fixHeight = this._verticalPatch.reduce(function (acc, cur) {
                    return acc + (cur < 0 ? -cur : 0);
                  }, 0);
                  this._padding = getPadding(this._rawContext);
                }
              case 8:
              case "end":
                return _context.stop();
            }
          }, _callee, this);
        }));
        function init() {
          return _init.apply(this, arguments);
        }
        return init;
      }()
      /**
       * 获取 9 patch 图片的 base64
       * Get the base64 of the 9 patch image
       *
       * @returns base64
       */
      )
    }, {
      key: "draw",
      value: function draw(element) {
        var _this$_padding, _this$_padding2, _this$_padding3, _this$_padding4;
        element.style.boxSizing = "border-box";
        if ((_this$_padding = this._padding) !== null && _this$_padding !== void 0 && _this$_padding[0]) element.style.paddingTop = "".concat(this._padding[0], "px");
        if ((_this$_padding2 = this._padding) !== null && _this$_padding2 !== void 0 && _this$_padding2[1]) element.style.paddingRight = "".concat(this._padding[1], "px");
        if ((_this$_padding3 = this._padding) !== null && _this$_padding3 !== void 0 && _this$_padding3[2]) element.style.paddingBottom = "".concat(this._padding[2], "px");
        if ((_this$_padding4 = this._padding) !== null && _this$_padding4 !== void 0 && _this$_padding4[3]) element.style.paddingLeft = "".concat(this._padding[3], "px");
        var width = element.clientWidth;
        var height = element.clientHeight;
        var base64 = this.getBase64(width, height);
        if (base64) {
          element.style.backgroundSize = "".concat(width, "px ").concat(height, "px");
          element.style.backgroundRepeat = "no-repeat";
          element.style.backgroundImage = "url('".concat(this.getBase64(width, height), "')");
        } else element.style.backgroundImage = "url('".concat(this._srcUrl, "')");
      }
    }, {
      key: "getBase64",
      value: function getBase64(width, height) {
        var ret;
        /* 如果符合格式要求，horizontalPatch 或 verticalPatch 会被赋值为 undefined
         If the formatting requirements are met, the horizontalPatch or verticalPatch is assigned undefined */
        if (this._horizontalPatch && this._verticalPatch) {
          /* 创建输出画布
           * Create an output canvas */
          var canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          var context = canvas.getContext("2d");

          /* 计算会被拉伸部分的宽高长度，计算方式为 (目标图片长度 - 固定长度) / (图片总长度 - 固定长度)；固定的长度在原图和目标画布是一致的
           * Calculate the width and height length of the stretched part as (target image length - fixed length) / (total image length - fixed length), the fixed length is the same as the original image and the target canvas */
          var horizontalStretchRatio = (width - this._fixWidth) / (this._imageWidth - this._fixWidth);
          var verticalStretchRatio = (height - this._fixHeight) / (this._imageHeight - this._fixHeight);

          /* 初始化
           * Initialize */
          var dw = 0,
            dh = 0,
            dx = 0,
            dy = 0;
          var sx = 1,
            sy = 1;
          /* 遍历每一行 patch
           * Iterate through each row of patches */
          for (var row = 0; row < this._verticalPatch.length; ++row) {
            /* 将临时画布改为该行的 patch 高度
             * Change the temporary canvas to the patch height of the row */
            this._tempCanvas.height = Math.abs(this._verticalPatch[row]);
            /* 遍历该行的每一列 patch，即每一个单独的 patch
             * Iterate through each column of patches in the row, i.e., each individual patch */
            for (var col = 0; col < this._horizontalPatch.length; ++col) {
              /* 将临时画布改为该 patch 宽度
               * Change the temporary canvas to that patch width  */
              this._tempCanvas.width = Math.abs(this._horizontalPatch[col]);

              /* 将原图的 patch 绘制到临时画布
               * Draw the patch of the original image to the temporary canvas */
              this._tempContext.drawImage(this._rawContext.canvas, sx, sy, this._tempCanvas.width, this._tempCanvas.height, 0, 0, this._tempCanvas.width, this._tempCanvas.height);
              /* 计算目标画布的 patch 大小，如果值为正数表示可以拉伸，那么进行变形，如果为负数，那么保持原有大小；保证绘制的 patch 大小不为负数
               * Calculate the size of the patch of the target canvas, deform if the value is positive to mean that it can be stretched, keep the original size if it is negative, and ensure that the size of the patch drawn is not negative */
              dw = this._horizontalPatch[col] < 0 ? -this._horizontalPatch[col] : this._horizontalPatch[col] * Math.max(horizontalStretchRatio, 0);
              dh = this._verticalPatch[row] < 0 ? -this._verticalPatch[row] : this._verticalPatch[row] * Math.max(verticalStretchRatio, 0);
              /* 将临时画布的 patch 绘制到目标画布
               * Draw a patch of the temporary canvas to the target canvas */
              context.drawImage(this._tempCanvas, 0, 0, this._tempCanvas.width, this._tempCanvas.height, dx, dy, dw, dh);
              /* 更新目标画布的 patch 位置
               * Update the patch position of the target canvas */
              dx += dw;
              /* 更新原图的 patch 位置
               * Update the patch location of the original image */
              sx += this._tempCanvas.width;
            }
            /* 更新目标画布的 patch 位置
             * Update the patch position of the target canvas */
            dx = 0;
            dy += dh;
            /* 更新原图的 patch 位置
             * Update the patch location of the original image */
            sx = 1;
            sy += this._tempCanvas.height;
          }
          /* 输出 base64
           * output base64 */
          ret = canvas.toDataURL("image/png");
        }
        return ret;
      }
    }]);
  }();
  function getOriginalImgContext(srcImg) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.src = srcImg;
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        var canvas = document.createElement("canvas");
        var width = img.width;
        var height = img.height;
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext("2d", {
          willReadFrequently: true
        });
        context.drawImage(img, 0, 0, width, height);
        resolve(context);
      };
      img.onerror = reject;
    });
  }

  /**
   * 获取水平 patch 大小
   * Get the horizontal patch size
   *
   * @param context 上下文 The context
   * @returns 返回数据是一个数组，数组的每个元素表示一个 patch 的大小，正数表示拉伸，负数表示固定大小
   * The return data is an array, each element of the array represents the size of a patch, a positive number means stretching, and a negative number means a fixed size
   */
  function getHorizontalPatch(context) {
    var rawData = context.getImageData(1, 0, context.canvas.width - 2, 1).data;
    return getPatchSize(rawData);
  }

  /**
   * 获取垂直 patch 大小
   * Get the vertical patch size
   *
   * @param context 上下文 The context
   * @returns 返回数据是一个数组，数组的每个元素表示一个 patch 的大小，正数表示拉伸，负数表示固定大小
   * The return data is an array, each element of the array represents the size of a patch, a positive number means stretching, and a negative number means a fixed size
   */
  function getVerticalPatch(context) {
    var rawData = context.getImageData(0, 1, 1, context.canvas.height - 2).data;
    return getPatchSize(rawData);
  }

  /**
   * 获取 padding
   * Get padding
   * @param context 上下文
   * @returns padding 数组，上右下左 padding array, top right bottom left
   */
  function getPadding(context) {
    var upAndDownPaddingPixelData = context.getImageData(context.canvas.width - 1, 1, 1, context.canvas.height - 2).data;
    var upAndDownPaddingSizeData = getPatchSize(upAndDownPaddingPixelData);
    var upAndDown = paddingSizeData2PaddingSize(upAndDownPaddingSizeData);
    var leftAndRightPaddingPixelData = context.getImageData(1, context.canvas.height - 1, context.canvas.width - 2, 1).data;
    var leftAndRightPaddingSizeData = getPatchSize(leftAndRightPaddingPixelData);
    var leftAndRight = paddingSizeData2PaddingSize(leftAndRightPaddingSizeData);
    return [upAndDown[0], leftAndRight[1], upAndDown[1], leftAndRight[0]];
  }

  /**
   * 将 paddingSizeData 转换为 paddingSize
   * Convert paddingSizeData to paddingSize
   *
   * @param paddingSizeData paddingSizeData
   * @returns padding 数组，上下或左右
   * padding array, top and bottom or left and right
   */
  function paddingSizeData2PaddingSize(paddingSizeData) {
    var ret = [undefined, undefined];
    switch (paddingSizeData === null || paddingSizeData === void 0 ? void 0 : paddingSizeData.length) {
      case 1:
        if (paddingSizeData[0] > 0) {
          ret[0] = 0;
          ret[1] = 0;
        }
        break;
      case 2:
        if (paddingSizeData[0] > 0) {
          ret[0] = 0;
          ret[1] = -paddingSizeData[1];
        } else {
          ret[0] = -paddingSizeData[0];
          ret[1] = 0;
        }
        break;
      case 3:
        if (paddingSizeData[0] < 0) {
          ret[0] = -paddingSizeData[0];
          ret[1] = -paddingSizeData[2];
        }
        break;
    }
    return ret;
  }

  /**
   * 获取 patch 的大小
   * Get the size of the patch
   *
   * @param rawData 原始数据
   * @returns 返回数据是一个数组，数组的每个元素表示一个 patch 的大小，正数表示拉伸，负数表示固定大小
   * The return data is an array, each element of the array represents the size of a patch, a positive number means stretching, and a negative number means a fixed size
   */
  function getPatchSize(rawData) {
    var ret = undefined;
    if (rawData.length >= 4 && rawData.length % 4 === 0) {
      var _ret;
      ret = [];
      var dataIndex = 0;
      var patchIndex = 0;
      ret[patchIndex] = 255 === rawData[dataIndex + 3] ? 1 : -1;
      for (var _dataIndex = 4; _dataIndex < rawData.length; _dataIndex += 4) {
        if (0 !== rawData[_dataIndex] || 0 !== rawData[_dataIndex + 1] || 0 !== rawData[_dataIndex + 2] || rawData[_dataIndex + 3] !== 255 && rawData[_dataIndex + 3] !== 0) {
          ret = undefined;
          break;
        }
        var isStretch = 255 === rawData[_dataIndex + 3];
        if (ret[patchIndex] > 0 !== isStretch) ret[++patchIndex] = 0;
        ret[patchIndex] += isStretch ? 1 : -1;
      }
      if (1 === ((_ret = ret) === null || _ret === void 0 ? void 0 : _ret.length) && 0 >= ret[0]) ret = undefined;
    }
    return ret;
  }

  return NinePatch;

}));
