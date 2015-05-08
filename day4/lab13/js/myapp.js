// lab: ng-repeat 介紹

angular.module('myApp', [])
.config(["$routeProvider", function($routeProvider) {
}])
.controller('helloWorld', ["$scope", "$http", function($scope, $http) {

   $scope.labName = 'ngRoute 介紹';
  
   $http({url:"http://140.109.6.150:10080/", "method":"GET"})
     .success(function(waterData) {
        $scope.lists = waterData.data;
        angular.forEach($scope.lists, function (list) {
           list.daliyInflow = parseFloat(list.daliyInflow);
           list.immediateLevel = parseFloat(list.immediateLevel);
        });
     })
   .error(function(data){ console.log(data) });
  
    $scope.delPsn = function(list) {
        var idx = $scope.lists.indexOf(list);
        if(idx >= 0) {
          $http({url:"server/save.php", "method":"POST", params:list })
            .success(function(waterData) {
               $scope.lists.splice(idx, 1);
               console.log(waterData);
           })
            .error(function(data){ console.log(data) });
        }
    };
}])
;
