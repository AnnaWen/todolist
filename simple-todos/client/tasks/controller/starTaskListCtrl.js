/**
 * Created by Alvin on 2015/10/9.
 */
angular.module('demoOne').controller('StarTaskListCtrl', ['$scope', '$stateParams', '$meteor','Itasks',
    function ($scope, $stateParams, $meteor,Itasks) {

        $scope.tasks = Itasks;
        if($stateParams.param == 'Starred' || $stateParams.param == 'Dropbox'){
            $scope.param = $stateParams.param;
        }
        $scope.ownType = $meteor.object(Types, $stateParams.param);

        $scope.isShow = true;
        $scope.show = function(){
            $scope.isShow = !$scope.isShow;
        };

        //slide the edit page
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



}]);