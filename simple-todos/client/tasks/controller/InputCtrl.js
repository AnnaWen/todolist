/**
 * Created by Alvin on 2015/9/29.
 */
angular.module('demoOne').controller('InputCtrl',['$scope','myTasksService',
    function ($scope,myTasksService) {

        //judge star state
        $scope.isStar = true;
        $scope.showStar = function(){
            $scope.isStar = ! $scope.isStar;
        };

        /*judge the palceholder content*/
        $scope.judgeParam = function(){
            if($scope.param == 'Starred'){
                $scope.isStar = false;
                $scope.inputText = 'Dropbox add a star task...';
            }else{
                $scope.inputText = 'add a task...';
            }
        };
        $scope.judgeParam();

        //add new task object
        $scope.addTask = function (task,ownType) {

            if(Meteor.user()){
                if($scope.param == 'Starred'){
                    task.category = 'Dropbox';
                    task.isstar = 'Starred';

                }else if($scope.param == 'Dropbox' || $scope.param == 'Unfinished'){

                    task.category = 'Dropbox';

                    if( !$scope.isStar){
                        task.isstar = 'Starred';
                    }else{
                        task.isstar = 'no';
                    }

                }else{

                    task.category = ownType.name;
                    task.categoryId = ownType._id;

                    if( !$scope.isStar){
                        task.isstar = 'Starred';
                    }else{
                        task.isstar = 'no';
                    }

                }

                myTasksService.addedTask(task);
                if($scope.param != 'Starred'){
                    $scope.isStar = true;
                }

            }else{
                window.alert("log in please");
            }

        };
}]);


