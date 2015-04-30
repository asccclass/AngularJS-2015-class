angular.module('myApp', [
  "ngRoute"
])
.config(["$routeProvider", function($routeProvider) {
   $routeProvider
      .when("/", {
         template: "<div> hi, This is mainpage</div>",
         controller: 'helloWorld'
      })
      .when("/pageA", {
         template: "<div> hi, This is page A</div>",
         controller: 'helloWorld'
      })
      .otherwise({ redirectTo: '/' }); 
}])
.controller('helloWorld', ['$scope', '$http', '$log', function($scope, $http, $log) {
  
   $scope.labName = "ngRoute 範例";
  
}])
;
