/**
 * Created by Alvin on 2015/9/29.
 */
angular.module('demoOne').controller('SearchResultCtrl',['$scope','$meteor','myTasksService','myShareService',
    function ($scope,$meteor,myTasksService,myShareService) {

        $scope.$on('taskNameBroadcast',function(){
            $scope.name = myShareService.name;
        });

        console.log( $scope.name+"[[[[[[[[[");

      //  $scope.tasks = Itasks;
        $scope.tasks = $meteor.collection(Tasks).subscribe("tasks");

        //slide and deliver one task object to edit page
        $scope.isChange = true;
        $scope.edit = function (task) {

            $scope.$root.$broadcast('edit-event',task);
            $scope.isChange = false;
        };
        //close the edit page
        $scope.close = function () {
            $scope.isChange = true;
        };
        //remove the task object and close the edit page
        $scope.remove = function () {
            $scope.isChange = true;
        };
        $scope.ok = function (task) {
            $scope.tasks.remove(task);
        };

        $scope.finished = function(task){
            myTasksService.finishedTask(task);
        };


}]);


