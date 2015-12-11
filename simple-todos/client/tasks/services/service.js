/**
 * Created by Alvin on 2015/10/18.
 */
angular.module('demoOne').factory('myShareService',function($rootScope){

    var shareService = {};
    shareService.name = '';

    shareService.preForBroadcast = function(name){

        this.name = name;
        this.broadCastItem();

    };

    shareService.broadCastItem = function(){
        $rootScope.$broadcast('taskNameBroadcast');
    };

    return shareService;
})
    .factory('myTasksService',function(){

        var tasksService = {};

        tasksService.addedTask = function(task){
            Meteor.call("addTask",task);
        };

        tasksService.removetasksbyType = function(typeId){
            Meteor.call('removeTask',typeId);
        };

        tasksService.finishedTask = function(task){
            Meteor.call("finishedTask",task);
        };
        tasksService.updateTask = function(task){
            Meteor.call("updateTask",task);
        };


        return tasksService;
    })
    .factory('myCategoryService',function(){

        var categoryService ={};

        categoryService.addCategory = function(newType){
            Meteor.call("addCategory",newType);
        };

        categoryService.updateCategory = function(newType){
            Meteor.call("updateCategory",newType);
        }

        return categoryService;
    });


/*
 .service('ConfirmService', function($modal) {

    var service = {};
    service.open = function (taskId) {
        var modalConfirmInstance = $modal.open({
            templateUrl: 'client/tasks/views/myDeleteConfirm.ng.html',
            controller: 'ModalConfirmCtrl',
            size:'md',
            resolve: {
                taskId: function () {
                    return taskId;
                }
            }
        });

    };

    return service;
})
 */
