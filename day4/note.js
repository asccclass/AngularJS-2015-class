
http://140.109.6.150/save.php?PK=123456


.controller('myController', ['$http', '$routeParams', 
   function($http, $routeParams) {
      var myParams = {"PK": $routeParams.id, 'bss':54321};
      $http({url:"http://140.109.6.150/save.php", 
         "method":"GET", param:myParams }).success(data)
        
      })
      .error(function(data){  });
   }])

