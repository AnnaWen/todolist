/**
 * Created by Alvin on 2015/9/29.
 */


angular.module('demoOne').controller('SearchCtrl',['$scope','$state','myShareService',function ($scope,$state,myShareService) {

    $scope.$on('$stateChangeSuccess',function(){

        if($state.current.name == 'inbox.searchTasks'){
            myShareService.preForBroadcast($scope.name);
        }
    });

        $scope.$watch('name',function(){

            if($scope.name != null && $state.current.name != 'inbox.searchTasks'){
                $state.go('inbox.searchTasks');
            }

            myShareService.preForBroadcast($scope.name);


        });

}]);


