/**
 * Created by Alvin on 2015/9/29.
 */


angular.module('demoOne').controller('TitleCtrl',['$scope','$translate',function ($scope,$translate) {

    $scope.switching = function(lang){
        $translate.use(lang);
        window.localStorage.lang = lang;
        window.location.reload();
    };
    $scope.cur_lang = $translate.use();
}]);


