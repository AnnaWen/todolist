/**
 * Created by Alvin on 2015/9/9.
 */
angular.module('demoOne').controller('TaskDetailsCtrl',['$scope','$stateParams','$meteor','$log','uiUploader','myTasksService','$timeout','$filter',
    function($scope,$stateParams,$meteor,$log,uiUploader,myTasksService,$timeout,$filter){

        $scope.tasks = $meteor.collection(Tasks).subscribe("tasks");

        /*judge star state*/
        $scope.showStar = function(){
            $scope.isStar = ! $scope.isStar;
        };


        /*got task object from parent TasksListCtrl*/
        $scope.$on('edit-event',function(event,task){

            $scope.task = task;
            $scope.saveFlag = true;

            if(task.isstar == 'Starred'){
                $scope.isStar = false;
            }else{
                $scope.isStar = true;
            }

            $scope.save = function(task){

                if(!$scope.isStar) {
                    task.isstar = 'Starred';
                }else{
                    task.isstar = 'no';
                }

                var tDate = $filter('datefilter')(task.endtime);
                var tClock = $filter('clockfilter')(task.endclock);

                task.dateclock = tDate+" "+tClock;

                myTasksService.updateTask(task);
                $scope.saveFlag = false;

                $timeout(function(){
                    $scope.saveFlag = true;
                },1000);

            }
        });
        $scope.finished = function(task){
            myTasksService.finishedTask(task);
        };

        /*show datepicker control*/
        $scope.today = function(){
            $scope.endtime = new Date(); // defined a property to accept today time
        };
        $scope.today();

        $scope.clear = function(){  //clear input content
            $scope.task.endtime = null;
        };
        $scope.open = function($event){
            $event.preventDefault();
            $event.stopPropagation();
            $scope.opened = true;
        };

        $scope.toggleMin = function(){
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.dateOptions = {
            formatYear : 'yy',
            startingDay : 1
        };

        $scope.format = 'yyyy-MM-dd';

        /*show timepicker control*/
        $scope.endclock = new Date();

        $scope.clearTime = function(){
            $scope.task.endclock = null;
        };

        $scope.isShow = false;
        $scope.showTimePicker = function(){
            $scope.isShow = !$scope.isShow;
        };


        /*remove taskChild*/
        $scope.removeChild = function(){
            $scope.task.taskChild = null;
        };

        $scope.isOver = true;
        $scope.judgeDate = function(time){
            console.log("panfuan shi fou jie shu le "+time);
            $scope.isOver = false;
        };



    }]);