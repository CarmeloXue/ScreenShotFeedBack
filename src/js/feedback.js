/**
 * Created by xuehaotian on 2017/3/2.
 */
var FEEDBACK_TEMPLATE = require('../template/feedBack.html');
var MODALWINDOW_TEMPLATE = require('../template/modalWindow.html');

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