angular.module("myApp", [
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('settings', {
            url: '/settings',
            templateUrl: 'template/lab5_0_setting.html'
        })
           .state('settings.profile', {
               url: '/profile',
               templateUrl: 'template/lab5_0_profile.html'
               //controller: 'ProfileController'
           })
           .state('settings.account', {
               url: '/account',
               templateUrl: 'template/lab5_0_account.html'
               //controller: 'AccountController'
           })
   $urlRouterProvider.otherwise('/settings/profile');
});