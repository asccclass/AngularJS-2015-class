angular.module('myApp', [])
.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
  
   $scope.labName = "directives 範例";
  
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
        .error(function(data){ console.log(data) });
   };
  
   // UBike 台北市每五分鐘更新一次資料
   $scope.reloadData = function() {
      $("#waiting").modal({keyboard:false, show: true});
      $scope.reloadFlag = 1;
      $scope.areas = [];
      $http({url:"http://140.109.6.150:10080/ubike", "method":"GET"})
         .success(function(ubikeData) {
            $scope.lists = angular.fromJson(ubikeData);     
            $scope.reloadFlag = 0; 
            angular.forEach($scope.lists.retVal, function (list) {
               if($scope.areas.indexOf(list.sarea) < 0)  
                  $scope.areas.push(list.sarea);
            });
            $("#waiting").modal('hide');
         })
         .error(function(data){ console.log(data); $scope.reloadFlag = 0; $("#waiting").modal('hide'); });
   };
  
   $scope.reloadData();
   $scope.loadWaterData();
  
}])
.directive('bikeWidget', [function() {    
   return {
      restrict: 'A', 
      templateUrl: "template/lab10.html"  ,
      scope: { bikeDatas: '=', areaData:'=' }, 
      link: function($scope, $element, $attrs) {
         $scope.getBalence = function(bike) {
            return bike.tot - bike.sbi;
         };
     }
   };
  
}]);
;
