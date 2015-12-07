/**
 * Created by Alvin on 2015/9/29.
 */
angular.module('demoOne').controller('addTypeCtrl',['$scope','$stateParams','$meteor','$modal',
    function ($scope,$stateParams,$meteor,$modal) {

    $scope.open = function(size){
        if(Meteor.userId()){
            var modalInstance = $modal.open({
                templateUrl : 'client/tasks/views/modal-addtype.ng.html',
                controller : 'myTypeModal',
                size : size,
                backdrop:false,
                resolve:{
                    type: function(){
                        return null;
                    }
                }

            });
        }else{
            window.alert("log in please!");
        }


    }
}]);


