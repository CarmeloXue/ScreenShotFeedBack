/**
 * Created by xuehaotian on 2017/3/2.
 */
var app
(function (app) {
    var feedBack = angular.module("feedBackWithScreenShot",[]);
    feedBack.run(['$templateCache',function ($templateCache) {

        $templateCache.put('feedBack/template/modalWindow.html',[
            '<div id="modalWindow" class="modal fade">',
            '<div class="modal-backdrop fade">',
            '<div class="modal-dialog">',
            '<div class="modal-content">',
            '<div class="modal-header">',
            '<button type="button" class="close" ng-click="hide(true)"><span>X</span></button>',
            '<h4 class="modal-title">{{title}}</h4>',
            '</div>',
            '<div class="modal-body"><ng-transclude></ng-transclude></div>',
            '<div class="modal-footer">',
            '<button type="button" class="btn btn-default" ng-click="Confirm()">Confirm</button>',
            '<button type="button" class="btn btn-warning" ng-click="Cancel()">Cancel</button>',
            '</div>',
            '</div>',
            '</div>',
            '</div>',
            '</div>'
        ].join(''));

        $templateCache.put('feedBack/template/feedBack.html',[
            '<div>',
            '<div ng-click="showModal()" ng-transclude="">',
            '</div>',
            '<moldal-window title="nihao"></moldal-window>',
            '</div>'
        ].join(""));
    }]);


    feedBack.directive('moldalWindow',[function () {
        return {
            restrict:'EA',
            templateUrl:'feedBack/template/modalWindow.html',
            scope:{
                title:'@'
            },
            controller:['$scope','$element','modalService',function ($scope,$element,modalService) {
                modalService.register($element);
                $scope.hide = modalService.hide;
                $scope.Cancel = modalService.hide;
            }],
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