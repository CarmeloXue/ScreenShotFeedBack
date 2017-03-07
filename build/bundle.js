/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = "<div>\n    <div ng-click=\"showModal()\" ng-transclude=\"\"></div>\n    <moldal-window title=\"nihao\"></moldal-window>\n</div>";

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal fade\">\n    <div class=\"modal-backdrop fade\">\n        <div class=\"modal-dialog\">\n           <div class=\"modal-content\">\n               <div class=\"modal-header\">\n                   <button type=\"button\" class=\"close\" ng-click=\"hide(true)\"><span>X</span></button>\n                   <h4 class=\"modal-title\">Title</h4>\n               </div>\n               <div class=\"modal-body\">\n\n               </div>\n               <div class=\"modal-footer\">\n                   <button type=\"button\" class=\"btn btn-default\" ng-click=\"Confirm()\">Confirm</button>\n                   <button type=\"button\" class=\"btn btn-warning\" ng-click=\"Cancel()\">Cancel</button>\n               </div>\n           </div>\n        </div>\n    </div>\n</div>";

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by xuehaotian on 2017/3/2.
 */
var FEEDBACK_TEMPLATE = __webpack_require__(0);
var MODALWINDOW_TEMPLATE = __webpack_require__(1);

var app
(function (app) {
    var feedBack = angular.module("feedBackWithScreenShot",[]);

    feedBack.directive('moldalWindow',[function () {
        return {
            restrict:'EA',
            template: FEEDBACK_TEMPLATE,
            scope:{
                title:'@'
            },
            controller:['$scope','$element','modalService',function ($scope,$element,modalService) {
                modalService.register($element);

                $scope.hide = modalService.hide;

                $scope.Cancel = modalService.hide;

                $scope.Confirm = function(){

                }
            }],
            replace:true,
            transclude:true
        }
    }]);

    feedBack.directive('feedBack',['modalService',function (modalService) {
        return {
            restrict:'EA',
            transclude:true,
            template:MODALWINDOW_TEMPLATE,
            link:link,
            scope:true
        }
        function link(scope,element) {
            modalService.register(element.find('#modalWindow'));
            scope.showModal = function () {
                modalService.show();
            }
        }

    }]);

    feedBack.factory('modalService',[function () {
        var modal,
            service = {};

        service.register = function (modalElement) {
            modal = modalElement;
            modal.css('zIndex',1500);
            modal.find('.modal-backdrop').css('zIndex',0);
        }

        service.unregister = function () {
            if(modal != null)
            {
                modal = null
            }
        }

        service.show = function () {
            if(!service.isOpen())
            {
                modal.css('display','block');
                modal.addClass('in');
                modal.children().css('display','block');
                modal.children().addClass('in');
            }
        }

        service.hide = function () {
            if(service.isOpen())
            {
                modal.css('display','none');
                modal.removeClass('in');
                modal.children().css('display','none');
                modal.children().removeClass('in');
            }
        }

        service.toggle = function () {
            if(service.isOpen())
            {
                service.hide()
            }
            else
            {
                service.show()
            }
        }

        service.isOpen = function () {
            return modal.css('display') !== 'none' && modal.css('display') !== '';
        }

        return service;
    }])
})(app || (app={}));

/***/ })
/******/ ]);