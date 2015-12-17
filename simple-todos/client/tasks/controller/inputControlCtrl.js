/**
 * Created by Alvin on 2015/9/29.
 */
angular.module('demoOne').controller('InputCtrl',['$scope','myTasksService','$stateParams','$filter','$translate',
    function ($scope,myTasksService,$stateParams,$filter,$translate) {

        $scope.param = $stateParams.param;
        //judge star state
        $scope.isStar = true;
        $scope.showStar = function(){
            $scope.isStar = ! $scope.isStar;
        };

        /*judge the palceholder content*/
        $scope.judgeParam = function(){
            if($scope.param == 'Starred'){
                $scope.isStar = false;
              /*  $scope.$watch(
                    function() { return  $filter('translate')('100016'); },
                    function(newval) { $scope.inputText = newval; }
                );
*/
            }/*else{
                $scope.inputText = $filter('translate')('100007');
            }*/
        };
        $scope.judgeParam();

        //add new task object
        $scope.addTask = function (task,ownType) {

            if(Meteor.user()){
                if($scope.param == 'Starred'){
                    task.category = 'Dropbox';
                    task.isstar = 'Starred';

                }else if($scope.param == 'Dropbox' || $scope.param == 'unfinished'){

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


