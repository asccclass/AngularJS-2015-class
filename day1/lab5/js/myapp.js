// lab: ng-repeat 介紹

angular.module('myApp', [])
.controller('helloWorld', ['$scope', '$http', function($scope, $http) {

   $scope.name = 'ng-repeat 介紹';

   $scope.lists = [
      { 'name':'Chih-Han Liu', 'age':18, 'dep':'計算中心' },
      { 'name':'Han-Chih Liu', 'age':28, 'dep':'調研中心' },
      { 'name':'Ch-Han Liu', 'age':38, 'dep':'資訊服務處' },
      { 'name':'Ci-Hbn Lju', 'age':48, 'dep':'總辦事處' },
      { 'name':'Ca-Hcn Lku', 'age':58, 'dep':'主計室' },
      { 'name':'Cb-Hdn Llu', 'age':68, 'dep':'人事室' },
      { 'name':'Cc-Hen Lmu', 'age':78, 'dep':'政風室' },
      { 'name':'Cd-Hfn Lnu', 'age':88, 'dep':'物理所' }
   ];

 
}]);
