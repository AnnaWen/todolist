/**
 * Created by Alvin on 2015/9/29.
 */
angular.module('demoOne').controller('TypeListCtrl', ['$scope','$stateParams','$meteor','$modal','$state','myTasksService',
    function ($scope,$stateParams,$meteor,$modal,$state,myTasksService) {

        $scope.types = $meteor.collection(Types).subscribe("types");
        $scope.tasks = $meteor.collection(Tasks).subscribe("tasks");

        //$scope.testaa = ;

        /*$scope.$watch(function(){return $state.params.param}, function (nVal, oVal) {
           $scope.testaa = nVal;

        });*/
        /*delete type */
        $scope.ok = function(type){
            myTasksService.removetasksbyType(type._id);
            $scope.types.remove(type);
            $state.go('inbox');
        };

        /*update type information*/
        $scope.edit = function(type){

            var modalInstance = $modal.open({
                templateUrl : 'client/tasks/views/modal-addtype.ng.html',
                controller : 'myTypeModal',
                size : 'sm',
                backdrop:false,
                resolve:{
                    type: function(){
                        return type;
                    }
                }
            });
        };

        /*judge mouse event to show icon*/
        /**
         * @return {boolean}
         */
        $scope.OnMouseEnter = function(type){
            return type.showIcon = !type.showIcon;
        };

        /*pass type object to page through my own srvice*/
      /*  $scope.findTaskByType = function(type){
            console.log("click my own type");
            myShareService.preForBroadcast(type);
        }*/



}]);