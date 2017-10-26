/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.addEventListener('DOMContentLoaded', function () {

    console.log('siemanko');

    var canvas = document.querySelector('#canvas');
    var c = canvas.getContext('2d');
    var innerWidth = canvas.width = window.innerWidth;
    var innerHeight = canvas.height = window.innerHeight - 50;
    var button = document.querySelector('#button');

    // --- Events ---

    canvas.addEventListener('click', function () {
        init();
    });

    window.addEventListener('resize', function () {
        innerWidth = canvas.width = window.innerWidth;
        innerHeight = canvas.height = window.innerHeight - 50;

        init();
    });

    button.addEventListener('click', function () {
        var raindropsNumber = document.querySelector('#raindropsNumber').value;

        dropsNumber = raindropsNumber;
        init();
    });

    // --- Utility functions ---

    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // --- Base Class ---

    var Rectangle = function () {
        function Rectangle(x, y, dy, width, height, color) {
            _classCallCheck(this, Rectangle);

            this.x = x;
            this.y = y;
            this.dy = dy;
            this.width = width;
            this.height = height;
            this.color = color;
        }

        _createClass(Rectangle, [{
            key: 'draw',
            value: function draw() {
                c.fillRect(this.x, this.y, this.width, this.height);
                c.fillStyle = this.color;
            }
        }, {
            key: 'update',
            value: function update() {

                // Restart cycle (inifinity)
                if (this.y > innerHeight) {
                    this.y = randomIntFromRange(-100, -500);
                }
                // Larger raindrops are faster 
                if (this.width >= 3 && this.height >= 10) {
                    this.dy = randomIntFromRange(11, 14);
                }

                this.y += this.dy;
                this.draw();
            }
        }]);

        return Rectangle;
    }();

    // --- Dynamic elements ---

    var rainDrop = void 0;
    var rainArray = void 0;
    var dropsNumber = 400;

    function init() {
        rainArray = [];
        for (var i = 0; i < dropsNumber; i++) {
            var x = randomIntFromRange(10, innerWidth - 10);
            var y = randomIntFromRange(-100, -300);
            var dy = randomIntFromRange(6, 10);
            var width = randomIntFromRange(2, 4);
            var height = randomIntFromRange(10, 14);
            // Alternative raidrop size to create more raindrops in background
            var widthBg = 2;
            var heightBg = 10;
            var color = 'rgb(139, 85, 139)';
            var halfDropsNumber = dropsNumber / 2;
            // Creating more raindrops on the background (realistic effect)
            if (i < halfDropsNumber) {
                rainArray.push(new Rectangle(x, y, dy, width, height, color));
            } else {
                rainArray.push(new Rectangle(x, y, dy, widthBg, heightBg, color));
            }
        }
    }

    // --- Main animation loop ---

    (function () {
        function main() {
            var stopMain = window.requestAnimationFrame(main);
            c.clearRect(0, 0, innerWidth, innerHeight);
            var length = rainArray.length;
            for (var i = 0; i < length; i++) {
                rainArray[i].update();
            }

            // Main loop content.
        }
        init(); // Initialize canvas with objects.
        main(); // Start the cycle.
    })();
});

/***/ })
/******/ ]);