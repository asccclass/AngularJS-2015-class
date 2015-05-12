angular.module('myApp', [])
.controller('bike', ["$scope", "$http", function($scope, $http) {
   $scope.labName = 'YouBike';
  
   // 排序
   $scope.sortField = 'sarea';
   $scope.sortType = true;
  
  $scope.reloadFlag = 0;
  
   // 台北市每五分鐘更新一次資料
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
  
    $scope.del = function(delData)  {
      $http({url:"server/save.php", "method":"POST", params: delData})
         .success(function(ubikeData) {
            if(ubikeData.msg == "OK")  {
               var idx = $scope.lists.retVal.indexOf(delData);
               if(idx > 0)  $scope.lists.retVal.splice(idx, 1);
            }
         })
         .error(function(data){ console.log(data); $scope.reloadFlag = 0;  $("#waiting").modal('hide'); });
       
    };
  
    $scope.reloadData();
}])
;
