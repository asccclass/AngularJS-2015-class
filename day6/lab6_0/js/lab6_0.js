angular.module('myApp', ['charts'])
  .directive('app', function() {
    return {
      controllerAs: 'main',
      controller: function() {
         var self = this;  
         var all = [
            {x: 'a',y: 20},   {x: 'b', y: 14},   {x: 'c', y: 12},  {x: 'd', y: 19},   
            {x: 'e', y: 18},  {x: 'f', y: 15},   {x: 'g', y: 10},  {x: 'h', y: 14}
         ];
        
         var filteredA = [
            {x: 'a',y: 9},   {x: 'b', y: 5},  {x: 'c', y: 6},  {x: 'd', y: 12}, 
            {x: 'e', y: 10}, {x: 'f', y: 7},  {x: 'g', y: 4},  {x: 'h', y: 9}
         ];
  
         var filteredB = [
            {x: 'a',y: 11},  {x: 'b', y: 9}, {x: 'c', y: 6}, {x: 'd', y: 7}, 
            {x: 'e', y: 8},  {x: 'f', y: 8}, {x: 'g', y: 6}, {x: 'h', y: 5}
         ];

         self.config = {
            title: 'y',
            margin: { top: 20, right: 20,  bottom: 30, left: 40 },
            width: 500, height: 500,
            bars: {
               onEnter: function(config) {
                  this.duration(1000).attr('opacity', 0);
               },
               onTransition: function(config) {
                  this.duration(1000).attr('opacity', 1)
                     .attr("x", function(d) { return config.x(d.x); })
                     .attr("width", config.x.rangeBand())
                     .attr("y", function(d) { return config.y(d.y); })
                     .attr("height", function(d) { return config.height - config.y(d.y); });
               },
               onExit: function(config) { this.duration(1000).attr('opacity', 0);  }
            }
         };

         self.update = function(id) {
            if(id == 1)       this.data = all;
            else if(id == 2 ) this.data = filteredA;
            else if(id == 3)  this.data = filteredB;
         };

         self.data = all;
      }
   }
});
