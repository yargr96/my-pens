/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Canvas/Canvas.module.scss":
/*!**************************************************!*\
  !*** ./src/components/Canvas/Canvas.module.scss ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"canvas":"hNnRXrHlQnLwmuJsTHq5"});

/***/ }),

/***/ "./src/components/Range/Range.module.scss":
/*!************************************************!*\
  !*** ./src/components/Range/Range.module.scss ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"range":"JUYzgMhgJCaCUNKzELfF"});

/***/ }),

/***/ "./src/styles/colors.module.scss":
/*!***************************************!*\
  !*** ./src/styles/colors.module.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"dark":"#212529","light":"#f8f9fa"});

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/Canvas/Canvas.ts":
/*!*****************************************!*\
  !*** ./src/components/Canvas/Canvas.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_CANVAS_SCALE": () => (/* binding */ DEFAULT_CANVAS_SCALE),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Canvas_module_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas.module.scss */ "./src/components/Canvas/Canvas.module.scss");

var DEFAULT_CANVAS_SCALE = 2;
var Canvas = function () {
    var canvas = document.createElement('canvas');
    canvas.className = _Canvas_module_scss__WEBPACK_IMPORTED_MODULE_0__["default"].canvas;
    var getContext = function () { return canvas.getContext('2d'); };
    var setSize = function (mountElement, scale) {
        if (scale === void 0) { scale = DEFAULT_CANVAS_SCALE; }
        var _a = mountElement.getBoundingClientRect(), width = _a.width, height = _a.height;
        canvas.width = width * scale;
        canvas.height = height * scale;
    };
    var append = function (element) {
        element.append(canvas);
    };
    return {
        element: canvas,
        getContext: getContext,
        setSize: setSize,
        append: append,
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Canvas);


/***/ }),

/***/ "./src/components/Canvas/index.ts":
/*!****************************************!*\
  !*** ./src/components/Canvas/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_CANVAS_SCALE": () => (/* reexport safe */ _Canvas__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_CANVAS_SCALE),
/* harmony export */   "default": () => (/* reexport safe */ _Canvas__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas */ "./src/components/Canvas/Canvas.ts");



/***/ }),

/***/ "./src/components/Range/Range.ts":
/*!***************************************!*\
  !*** ./src/components/Range/Range.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Range_module_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Range.module.scss */ "./src/components/Range/Range.module.scss");

var Range = function () {
    var range = document.createElement('input');
    range.type = 'range';
    range.min = '3';
    range.max = '10';
    range.className = _Range_module_scss__WEBPACK_IMPORTED_MODULE_0__["default"].range;
    return range;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Range);


/***/ }),

/***/ "./src/components/Range/index.ts":
/*!***************************************!*\
  !*** ./src/components/Range/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _Range__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _Range__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Range */ "./src/components/Range/Range.ts");



/***/ }),

/***/ "./src/modules/gravity/Gravity.ts":
/*!****************************************!*\
  !*** ./src/modules/gravity/Gravity.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/Canvas */ "./src/components/Canvas/index.ts");
/* harmony import */ var _utils_Particle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/Particle */ "./src/utils/Particle.ts");
/* harmony import */ var _utils_Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/Vector */ "./src/utils/Vector.ts");
/* harmony import */ var _styles_colors_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/colors.module.scss */ "./src/styles/colors.module.scss");




var config = {
    speed: 1.4,
    particleSize: 20,
    decelerationCoefficient: 0.99,
    pointsCount: 500,
};
var Gravity = function (mountElement, renderLoop) {
    var _a = (0,_components_Canvas__WEBPACK_IMPORTED_MODULE_0__["default"])(), canvas = _a.element, setSize = _a.setSize, append = _a.append, getContext = _a.getContext;
    setSize(mountElement);
    append(mountElement);
    var context = getContext();
    var particles = [];
    var mouse = [canvas.width / 2, canvas.height / 2];
    var halfParticleSize = config.particleSize / 2;
    var clear = function () {
        context.fillStyle = _styles_colors_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].dark;
        context.fillRect(0, 0, canvas.width, canvas.height);
    };
    var isParticleOutOfBounds = function (particle) {
        var isOutOfX = (particle.position[0] + halfParticleSize >= canvas.width
            && particle.velocity[0] > 0) || (particle.position[0] - halfParticleSize < 0
            && particle.velocity[0] < 0);
        var isOutOfY = (particle.position[1] + halfParticleSize >= canvas.height
            && particle.velocity[1] > 0) || (particle.position[1] - halfParticleSize < 0
            && particle.velocity[1] < 0);
        return {
            x: isOutOfX,
            y: isOutOfY,
        };
    };
    var getUpdatedParticle = function (_a) {
        var position = _a.position, velocity = _a.velocity;
        var angle = (0,_utils_Vector__WEBPACK_IMPORTED_MODULE_2__.getVectorAngle)((0,_utils_Vector__WEBPACK_IMPORTED_MODULE_2__.subtractVector)(mouse, position));
        var particle = (0,_utils_Particle__WEBPACK_IMPORTED_MODULE_1__.getMovedParticle)({
            position: position,
            acceleration: (0,_utils_Vector__WEBPACK_IMPORTED_MODULE_2__.polarToCartesianVector)(config.speed, angle),
            velocity: (0,_utils_Vector__WEBPACK_IMPORTED_MODULE_2__.multiplyVectorByNumber)(velocity, config.decelerationCoefficient),
        });
        var isOutOfBounds = isParticleOutOfBounds(particle);
        if (isOutOfBounds.x) {
            particle.velocity[0] *= -1;
        }
        if (isOutOfBounds.y) {
            particle.velocity[1] *= -1;
        }
        return particle;
    };
    var updateParticles = function () {
        particles = particles.map(getUpdatedParticle);
    };
    var setupParticles = function (count) {
        particles = [];
        for (var i = 0; i < count; i += 1) {
            particles.push({
                position: [canvas.width * Math.random(), canvas.height * Math.random()],
                velocity: [Math.random() * 10 - 5, Math.random() * 10 - 5],
                acceleration: [0, 0],
            });
        }
    };
    var render = function () {
        setupParticles(config.pointsCount);
        var renderFrame = renderLoop.getRenderFrame(function () {
            clear();
            updateParticles();
            context.fillStyle = _styles_colors_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].light;
            particles.forEach(function (_a) {
                var _b = _a.position, x = _b[0], y = _b[1];
                context.beginPath();
                context.arc(x, y, halfParticleSize, 0, Math.PI * 2);
                context.fill();
            });
        });
        renderFrame();
    };
    render();
    canvas.addEventListener('mousemove', function (_a) {
        var offsetX = _a.offsetX, offsetY = _a.offsetY;
        mouse = (0,_utils_Vector__WEBPACK_IMPORTED_MODULE_2__.multiplyVectorByNumber)([offsetX, offsetY], _components_Canvas__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_CANVAS_SCALE);
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gravity);


/***/ }),

/***/ "./src/modules/gravity/index.ts":
/*!**************************************!*\
  !*** ./src/modules/gravity/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _modules_gravity_Gravity__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _modules_gravity_Gravity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/modules/gravity/Gravity */ "./src/modules/gravity/Gravity.ts");



/***/ }),

/***/ "./src/modules/sierpinski-triangle/SierpinskiTriangle.ts":
/*!***************************************************************!*\
  !*** ./src/modules/sierpinski-triangle/SierpinskiTriangle.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/Canvas */ "./src/components/Canvas/index.ts");
/* harmony import */ var _components_Range__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/Range */ "./src/components/Range/index.ts");
/* harmony import */ var _utils_Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/Vector */ "./src/utils/Vector.ts");
/* harmony import */ var _styles_colors_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/styles/colors.module.scss */ "./src/styles/colors.module.scss");




var CIRCLE_OFFSET = 100;
var getBasePoints = function (count, centerCoordinate) {
    var radius = Math.min.apply(Math, centerCoordinate) - CIRCLE_OFFSET;
    var angleStep = (2 * Math.PI) / count;
    var basePoints = [];
    for (var i = 0; i < count; i += 1) {
        var angle = angleStep * i + _utils_Vector__WEBPACK_IMPORTED_MODULE_2__.CLOCK_ANGLE_OFFSET;
        basePoints.push((0,_utils_Vector__WEBPACK_IMPORTED_MODULE_2__.addVectors)((0,_utils_Vector__WEBPACK_IMPORTED_MODULE_2__.polarToCartesianVector)(radius, angle), centerCoordinate));
    }
    return basePoints;
};
var SierpinskiTriangle = function (mountElement, renderLoop) {
    var _a = (0,_components_Canvas__WEBPACK_IMPORTED_MODULE_0__["default"])(), canvas = _a.element, setSize = _a.setSize, append = _a.append, getContext = _a.getContext;
    setSize(mountElement);
    append(mountElement);
    var basePointsCount = 3;
    var context = getContext();
    var centerCoordinate = [
        canvas.width / 2,
        canvas.height / 2,
    ];
    var render = function () {
        context.fillStyle = _styles_colors_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].dark;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = _styles_colors_module_scss__WEBPACK_IMPORTED_MODULE_3__["default"].light;
        var basePoints = getBasePoints(basePointsCount, centerCoordinate);
        basePoints.forEach(function (_a) {
            var x = _a[0], y = _a[1];
            context.fillRect(x, y, 1, 1);
        });
        var lastPoint = basePoints[0];
        var renderFrame = renderLoop.getRenderFrame(function () {
            for (var i = 0; i < 100; i += 1) {
                var nextPointIndex = Math.floor(Math.random() * basePoints.length);
                var nextPoint = basePoints[nextPointIndex];
                var newPoint = (0,_utils_Vector__WEBPACK_IMPORTED_MODULE_2__.getPointBetween)(lastPoint, nextPoint);
                context.fillRect(newPoint[0], newPoint[1], 2, 2);
                lastPoint = newPoint;
            }
        });
        renderFrame();
    };
    render();
    var range = (0,_components_Range__WEBPACK_IMPORTED_MODULE_1__["default"])();
    range.value = String(basePointsCount);
    mountElement.appendChild(range);
    range.addEventListener('input', function (_a) {
        var target = _a.target;
        basePointsCount = Number(target.value);
        render();
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SierpinskiTriangle);


/***/ }),

/***/ "./src/modules/sierpinski-triangle/index.ts":
/*!**************************************************!*\
  !*** ./src/modules/sierpinski-triangle/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _SierpinskiTriangle__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _SierpinskiTriangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SierpinskiTriangle */ "./src/modules/sierpinski-triangle/SierpinskiTriangle.ts");



/***/ }),

/***/ "./src/utils/Particle.ts":
/*!*******************************!*\
  !*** ./src/utils/Particle.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMovedParticle": () => (/* binding */ getMovedParticle)
/* harmony export */ });
/* harmony import */ var _utils_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/Vector */ "./src/utils/Vector.ts");

var getMovedParticle = function (_a) {
    var position = _a.position, velocity = _a.velocity, acceleration = _a.acceleration;
    return ({
        position: (0,_utils_Vector__WEBPACK_IMPORTED_MODULE_0__.addVectors)(position, velocity),
        velocity: (0,_utils_Vector__WEBPACK_IMPORTED_MODULE_0__.addVectors)(velocity, acceleration),
        acceleration: acceleration,
    });
};


/***/ }),

/***/ "./src/utils/Vector.ts":
/*!*****************************!*\
  !*** ./src/utils/Vector.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CLOCK_ANGLE_OFFSET": () => (/* binding */ CLOCK_ANGLE_OFFSET),
/* harmony export */   "addVectors": () => (/* binding */ addVectors),
/* harmony export */   "getPointBetween": () => (/* binding */ getPointBetween),
/* harmony export */   "getVectorAngle": () => (/* binding */ getVectorAngle),
/* harmony export */   "multiplyVectorByNumber": () => (/* binding */ multiplyVectorByNumber),
/* harmony export */   "polarToCartesianVector": () => (/* binding */ polarToCartesianVector),
/* harmony export */   "subtractVector": () => (/* binding */ subtractVector)
/* harmony export */ });
var addVectors = function (a, b) { return [
    a[0] + b[0],
    a[1] + b[1],
]; };
var subtractVector = function (a, b) { return [
    a[0] - b[0],
    a[1] - b[1],
]; };
var multiplyVectorByNumber = function (_a, number) {
    var x = _a[0], y = _a[1];
    return [
        x * number,
        y * number,
    ];
};
var getPointBetween = function (a, b) { return [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
]; };
var polarToCartesianVector = function (radius, angle) { return [
    radius * Math.cos(angle),
    radius * Math.sin(angle),
]; };
var getVectorAngle = function (_a) {
    var x = _a[0], y = _a[1];
    return Math.atan2(y, x);
};
var CLOCK_ANGLE_OFFSET = -Math.PI / 2;


/***/ }),

/***/ "./src/utils/useRenderLoop.ts":
/*!************************************!*\
  !*** ./src/utils/useRenderLoop.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var useRenderLoop = function () {
    var renderFrameSingleton;
    var getRenderFrame = function (callback) {
        var renderFrame = function () {
            if (renderFrame !== renderFrameSingleton) {
                return;
            }
            callback();
            requestAnimationFrame(renderFrame);
        };
        renderFrameSingleton = renderFrame;
        return renderFrame;
    };
    var stop = function () {
        renderFrameSingleton = function () { };
    };
    return {
        getRenderFrame: getRenderFrame,
        stop: stop,
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useRenderLoop);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _modules_gravity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/modules/gravity */ "./src/modules/gravity/index.ts");
/* harmony import */ var _modules_sierpinski_triangle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/modules/sierpinski-triangle */ "./src/modules/sierpinski-triangle/index.ts");
/* harmony import */ var _utils_useRenderLoop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/useRenderLoop */ "./src/utils/useRenderLoop.ts");




var navItems = [
    {
        text: 'Gravity',
        module: _modules_gravity__WEBPACK_IMPORTED_MODULE_1__["default"],
    },
    {
        text: 'Sierpinski triangle',
        module: _modules_sierpinski_triangle__WEBPACK_IMPORTED_MODULE_2__["default"],
    },
];
var app = function () {
    var renderLoop = (0,_utils_useRenderLoop__WEBPACK_IMPORTED_MODULE_3__["default"])();
    var mountElement = document.querySelector('#content');
    var navItemsContainer = document.querySelector('#nav-items');
    navItems.forEach(function (_a) {
        var text = _a.text, module = _a.module;
        var item = document.createElement('div');
        item.className = 'sidebar__item';
        item.textContent = text;
        item.addEventListener('click', function () {
            mountElement.innerHTML = '';
            module(mountElement, renderLoop);
        });
        navItemsContainer.appendChild(item);
    });
};
document.addEventListener('DOMContentLoaded', app);

})();

/******/ })()
;
//# sourceMappingURL=bundle.5b602dc9.js.map