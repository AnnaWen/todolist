/**
 * Created by Alvin on 2015/9/9.
 */
Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

angular.module('demoOne').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

        $urlRouterProvider.otherwise('/task');
        // use the HTML5 History API
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('inbox',{

                url:'/task',
                views: {
                    'left': {
                        templateUrl: 'client/tasks/views/types-list-owner.ng.html',
                        controller: 'TypeListCtrl'
                    },
                    'content': {
                        templateUrl: 'client/tasks/views/main.ng.html',
                        controller: 'MainCtrl'
                    }
                }

            })
            .state('inbox.tasks',{
                url: '/item/:param',
                views:{
                   'content@':{
                       templateUrl: 'client/tasks/views/xingji.ng.html',
                       controller: 'StarTaskListCtrl',
                       resolve:{
                           Itasks:['$meteor','$stateParams',function($meteor,$stateParams){

                               return $meteor.collection(function(){

                                   if($stateParams.param == 'Dropbox'){
                                       return Tasks.find({category:$stateParams.param});
                                   }else if($stateParams.param == 'Starred'){
                                       return Tasks.find({isstar:$stateParams.param});
                                   }else{
                                       return Tasks.find({categoryId:$stateParams.param});
                                   }

                               })
                           }]
                       }
                   }

                }
            })
            .state('inbox.searchTasks',{
                url: '/searchTasks',
                views:{
                    'content@':{
                        templateUrl: 'client/tasks/views/search-result.ng.html',
                        controller: 'SearchResultCtrl'
                    }
                }

            })
            .state('inbox.totaltasks',{
                url:'/condition/:param',
                views:{
                    'content@':{
                        templateUrl: function($stateParams){
                           return  'client/tasks/views/'+$stateParams.param+'.ng.html';
                        },
                        controller: 'TotalTasksCtrl'
                    }
                }
            });

      /*  $stateProvider
            .state('/login',{
                url:'/login',
                templateUrl:'client/tasks/views/login.ng.html',
                controller:'LoginCtrl'
            })
            .state('/register',{
                url:'/register',
                templateUrl:'client/tasks/views/register.ng.html',
                controller:'RegisterCtrl'
            })
            .state('tasks',{
                url: '/tasks',
                templateUrl: 'client/tasks/views/shoujian.ng.html',
                controller: 'TasksListCtrl',
                resolve: {
                    "currentUser": ["$meteor", function($meteor){
                        return $meteor.requireUser();
                    }]
                }
            })
            .state('searchTasks',{
                url: '/searchTasks/:searchText',
                templateUrl: 'client/tasks/views/search-result.ng.html',
                controller: 'SearchResultCtrl'
            })

            .state('findMyTypes',{
                url: '/findmytypes',
                templateUrl: 'client/tasks/views/types-list-owner.ng.html',
                controller: 'MyTypeListCtrl'
            })
            .state('findStarTask',{
                url: '/findstartypes/isStar',
                templateUrl: 'client/tasks/views/xingji.ng.html',
                controller: 'StarTaskListCtrl'
            });
        //如果没有路由引擎能匹配当前的导航状态，那它就会默认将路径路由至 tasks
        $urlRouterProvider.otherwise("/tasks");*/
    }]);

