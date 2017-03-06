/**
 * Created by xuehaotian on 2017/3/2.
 */
var app
(function (app) {
    var feedBack = angular.module("feedBackWithScreenShot",[]);
    feedBack.run(['$templateCache',function ($templateCache) {
        $templateCache.put('feedBack/template/modalWindow.html',[
            '<div class="modal fade">',
            '<div class="modal-backdrop fade">',
            '<div class="modal-dialog">',
            '<div class="modal-content">',
            '<div class="modal-header">',
            '<button type="button" class="close" ng-click="hide(true)"><span>X</span></button>',
            '<h4 class="modal-title">{{title}}</h4>',
            '</div>',
            '<div class="modal-body"><ng-transclude></ng-transclude></div>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'
        ].join(''));

        $templateCache.put('feedBack/template/feedBack.html',[
            '<div ng-click="showModal()" ng-transclude="">',
            '</div>',
            '<modal-window title="nihao"></modal-window>',
        ].join(""));
    }]);


    feedBack.directive('moldalWindow',['modalService',function (modalService) {
        return {
            restrict:'EA',
            templateUrl:'feedBack/template/modalWindow.html',
            scope:{
                title:'@'
            },
            link:function () {

            },
            replace:true,
            transclude:true
        }
    }]);

    feedBack.directive('feedBack',['modalService',function (modalService) {
        return {
            restrict:'EA',
            transclude:true,
            templateUrl:'feedBack/template/feedBack.html',
            link:link
        }
        function link(scope,element,attrs) {
            var modelWindow = element.find('.modal');
            modalService.register(modelWindow)
            scope.showModal = modalService.show;
        }

    }]);

    feedBack.factory('modalService',[function () {
        var service = {},
            modelElement,
            modalWindowFuncs;
        service.register = function (modelElement) {

            modelElement = modelElement;
            modalWindowFuncs = {
                show:service.show,
                hide:service.hide,
                toggle:service.toggle,
                isOpen:service.isOpen
            }
        }
        service.unregister = function () {
            modalWindowFuncs = null;
        }
        service.show = function () {
            if(!service.isOpen())
            {
                modelElement.css('display','block');
                modelElement.addClass('in');
                modelElement.find('.modal-backdrop').css('display','block');
                modelElement.find('.modal-backdrop').addClass('in');
            }
        }

        service.hide = function () {
            if(service.isOpen())
            {
                modelElement.css('display','none');
                modelElement.removeClass('in');
                modelElement.find('.modal-backdrop').css('display','none');
                modelElement.find('.modal-backdrop').removeClass('in');
            }
        }

        service.toggle = function () {
            if(service.isOpen())
            {
                service.hide();
            }
            else
            {
                service.show();
            }
        }

        service.isOpen = function () {
            return modelElement.css('display') != 'none';
        }

        return service;

    }])

})(app || (app={}));