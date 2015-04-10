// lab: ng-repeat 介紹

angular.module('myApp', [])
.controller('helloWorld', ["$scope", "$http", function($scope, $http) {

   $scope.labName = 'Lab8-1 $filter 介紹－自訂filter';
  
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
.filter('strTruncate', function() {
   return function(stringz, lenz, endSign) {
      if(!endSign)   endSign = "..";
      if(!lenz)  lenz = 3;
     
      if(stringz.length <= lenz)   return stringz;
      else return String(stringz).substring(0, lenz) + endSign;    
   };
})
;
