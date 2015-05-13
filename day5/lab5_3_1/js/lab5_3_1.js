angular.module('myApp', [])
.controller('bike', ["$scope", "ubike", function($scope, ubike) {
   $scope.labName = 'YouBike';
   // 排序
   $scope.sortField = 'sarea';
   $scope.sortType = true;
   $scope.reloadFlag = 0;
  $scope.areas = [];
  
   // 台北市每五分鐘更新一次資料
      $("#waiting").modal({keyboard:false, show: true});
      $scope.reloadFlag = 0;
      ubike.reloadData().success(function(ubikeData) {
         $scope.lists = angular.fromJson(ubikeData);
         angular.forEach($scope.lists.retVal, function (list) {
            if($scope.areas.indexOf(list.sarea) < 0)  
               $scope.areas.push(list.sarea);
         });
         $scope.reloadFlag = 1;
         $("#waiting").modal('hide');
      })
      .error(function(data) { 
          $scope.reloadFlag = 1;
          $("#waiting").modal('hide');
      });
}])
.service('ubike', ['$http', function($http){
   var self = this;
  
   self.reloadData = function() {     
      return $http({url:"http://140.109.6.150:10080/ubike", 
                    "method":"GET"});
   };
}]);
