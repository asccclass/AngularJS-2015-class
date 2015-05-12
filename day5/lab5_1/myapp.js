
angular.module('myApp', [])
   .controller('helloWorld', ['$scope', 'myFS', function($scope, myFS) {
      myFS.doFunction();
   }])

   .factory('myFS', function() {
      return {
         doFunction: function() {   }
      };
   })

   .service('myFS', function() {
      this.doFunction = function() {  }
   })
;
