// lab: ng-repeat 介紹

angular.module('myApp', [])
.controller('helloWorld', ["$scope", "$http", function($scope, $http) {

   $scope.labName = 'Lab8 $filter 介紹－自訂filter';
  
   // 排序
   $scope.sortField = 'daliyInflow';
   $scope.sortType = true;
  
   $http({url:"http://140.109.6.150:10080/", "method":"GET"})
     .success(function(waterData) {
        $scope.lists = waterData.data;
        angular.forEach($scope.lists, function (list) {
           list.daliyInflow = parseFloat(list.daliyInflow);
        });
     })
   .error(function(data){ console.log(data) });
  
   $scope.addPsn = function(person)  {
     $scope.lists.push(person);
     $scope.person = {};
   };
}])
.filter('engNumber', function() {
   return function(num) {
      if(isNaN(num) || num < 1)  return num;
      
      var d = num % 10; // 取餘數
     
      if(d == 1)  return num + 'st';
      else if(d == 2)  return num + 'nd';
      else if(d == 3)  return num + 'rd';
      else return num + 'th';
   };
})
;
