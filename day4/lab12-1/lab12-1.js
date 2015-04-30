angular.module('myApp', [
  "ngRoute"
])
.config(["$routeProvider", function($routeProvider) {
   $routeProvider
      .when("/", {
         templateUrl: "template/bike.html",
         controller: 'helloWorld'
      })
      .when("/water", {
         templateUrl: "template/water.html",
         controller: 'helloWorld'
      })
      .otherwise({ redirectTo: '/' }); 
}])
.controller('helloWorld', ['$scope', '$http', '$log', function($scope, $http, $log) {
  
   $scope.labName = "ngRoute ubike/water 範例";
  
   // 水庫進水量
   $scope.loadWaterData = function() {
      $http({url:"http://140.109.6.150:10080/", "method":"GET"})
        .success(function(data) {
           $scope.waterData = data.data;
           angular.forEach($scope.lists, function (list) {
              list.daliyInflow = parseFloat(list.daliyInflow);
              list.immediateLevel = parseFloat(list.immediateLevel);
           });
        })
        .error(function(data){  });
   };
  
   // UBike 台北市每五分鐘更新一次資料
   $scope.reloadData = function() {
      $scope.areas = [];
      $http({url:"http://140.109.6.150:10080/ubike", "method":"GET"})
         .success(function(ubikeData) {
            $scope.lists = angular.fromJson(ubikeData);  
            angular.forEach($scope.lists.retVal, function (list) {
               if($scope.areas.indexOf(list.sarea) < 0)  
                  $scope.areas.push(list.sarea);
            });
         });
   };
  
   $scope.reloadData();
   $scope.loadWaterData();
}])
;
