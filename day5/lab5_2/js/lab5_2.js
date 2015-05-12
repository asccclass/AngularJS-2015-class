angular.module('myApp', [])
 .controller('helloWorld', ['$scope', 'msgTools', function($scope, msgTools) {
    $scope.addMsg = function(str)  {
       msgTools.addMsg(str);
    };
 }])
 .service('msgTools', ['$window', function($window) {
    var msgs = [];
    var self = this;

    self.addMsg = function(s) {
       msgs.push(s);
       if(msgs.length == 3)  {
          $window.alert(msgs.join("\n"));
          msgs = [];
       }
    };
 }]);
