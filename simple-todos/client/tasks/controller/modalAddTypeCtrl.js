/**
 * Created by Alvin on 2015/10/7.
 */
angular.module('demoOne').controller('myTypeModal',['$scope','$meteor','$modalInstance','type','myCategoryService',
    function ($scope,$meteor,$modalInstance,type,myCategoryService) {

        $scope.types = $meteor.collection(Types).subscribe("types");
        $scope.newType = type;


        $scope.ok = function(newType){      //add owner's folder type

            if(newType._id != null ){
                myCategoryService.updateCategory(newType);

            }else{
                myCategoryService.addCategory(newType);

            }
            $modalInstance.close(); //关闭并返回当前选项
        };


        $scope.cancel = function(){
            $modalInstance.dismiss('cancel'); // 退出
        }

}]);
