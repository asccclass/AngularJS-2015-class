// lab: $http 取回server資料 介紹

angular.module('myApp', [])
.controller('helloWorld', ['$scope', '$http', function($scope, $http) {

   $http({'url':'http://140.109.6.150:10080/today', 'method':'GET'})
    .success(function(data) {
       console.log(data);
    })
    .error(function(data) {
       console.log(data);
    });

   $scope.name = '$http 遠端取得資料範例';
 
}]);
