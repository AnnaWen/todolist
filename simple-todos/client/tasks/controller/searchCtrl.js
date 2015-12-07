/**
 * Created by Alvin on 2015/9/29.
 */


angular.module('demoOne').controller('SearchCtrl',['$scope','$state','myShareService',function ($scope,$state,myShareService) {

    $scope.$on('$stateChangeSuccess',function(){

        if($state.current.name == 'inbox.searchTasks'){
            console.log("execute"+$scope.name);
            myShareService.preForBroadcast($scope.name);
        }

    });

        $scope.$watch('name',function(){

            if($scope.name != null && $state.current.name != 'inbox.searchTasks'){
                console.log("before enter search");
                $state.go('inbox.searchTasks');
                console.log("after enter search");
            }
                console.log("perform");
                myShareService.preForBroadcast($scope.name);


        });

}]);


