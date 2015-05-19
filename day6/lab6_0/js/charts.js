
function ChartController() {
  var self = this;
  var elements = [];
  self.addListener = function(observer) {
     elements.push(observer)
  };

  self.removeListener = function(observer) {
    var index = elements.indexOf(observer);
    if(index)  elements.splice(index, 1);
  };

  self.notify = function(message) {
    for(var i = elements.length - 1; i >= 0; i--) 
       elements[i](message);
  };
}


angular.module('charts', [])
.directive('chart', function() {
  return {
    replace: true,
    controller: ChartController,
    controllerAs: 'ctrl',
    bindToController: true,
    link: function($scope, element, attrs, ctrl) {
      function getDefaultConfig() {
        var margin = { top: 20, right: 20, bottom: 20, left: 40  },
             width = 500 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom,
            config = {};

        config.margin = margin;
        config.height = height;
        config.width = width;
        return config;
      }

      var config = $scope.ctrl.config = angular.extend(getDefaultConfig(), $scope.ctrl.config || {});
      var svg = config.svg = d3.select(element[0]).append("svg")
        .attr("width", config.width + config.margin.left + config.margin.right)
        .attr("height", config.height + config.margin.top + config.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + config.margin.left + "," + config.margin.top + ")");


      config.x = d3.scale.ordinal().rangeRoundBands([0, config.width], .05);
      config.y = d3.scale.linear().range([config.height, 0]);
      config.axisX = svg.append("g").attr("class", "x axis");
      config.axisY = svg.append("g").attr("class", "y axis");

      function notify() {
        var data = $scope.ctrl.data || {};

        config.xAxis = d3.svg.axis()
          .scale(config.x)
          .orient("bottom");

        config.yAxis = d3.svg.axis()
          .scale(config.y)
          .orient("left");

        config.x.domain(data.map(function(d) { return d.x; }));
        config.y.domain([0, d3.max(data, function(d) {
          return d.y;
        })]);

        ctrl.notify({
          data: data,
          config: config
        });
      }

      $scope.$watch('ctrl.data', notify);
    },
    scope: {
      data: '=',
      config: '='
    }
  };
})
.directive('bars', ['ChartTransitions', function(ChartTransitions) {
    return {
      require: '^chart',
      scope: {},
      link: function($scope, element, attrs, ctrl) {

        var key = attrs.configKey || 'undefined';
        var transition = function(config) {
          this.duration(1000)
            .attr('opacity', 1)
            .attr("x", function(d) {
              return config.x(d.x);
            })
            .attr("width", config.x.rangeBand())
            .attr("y", function(d) {
              return config.y(d.y);
            })
            .attr("height", function(d) {
              return config.height - config.y(d.y);
            });
        };

        var exit = function(config) {
          this.duration(1000).remove();
        };

        var enter = function(config) {
          this.duration(1000).attr('opacity', 0);
        };

        function update(data) {
          var config = data.config,
            data = data.data;

          var bars = config.svg.selectAll(".bar")
            .data(data);

          var entered = bars.enter().append("rect")
            .attr('class', 'bar')
            .attr('opacity', 0);

          var transitions = {};
          transitions.onEnter = (config[key] && config[key].onEnter) ? config[key].onEnter : enter;
          transitions.onTransition = (config[key] && config[key].onTransition) ? config[key].onTransition : transition;
          transitions.onExit = (config[key] && config[key].onExit) ? config[key].onExit : exit;

          ChartTransitions.transition(entered, bars, transitions, config);
        }
        ctrl.addListener(update.bind(this));
      }
    };
  }
])
.directive('axis', function() {
  return {
    require: '^chart',   // 表示需要搭配chart controller or module
    scope: {
      position: '@'
    },
    link: function($scope, element, attrs, ctrl) {

      function update(data) {
        var config = data.config,
          data = data.data;
        var transition = config.svg.transition().duration(1000).transition();

        if (attrs.position === 'bottom') {
          transition.selectAll("g.x.axis")
            .attr("transform", "translate(0," + config.height + ")")
            .call(config.xAxis);
        } else if (attrs.position === 'left') {
          transition.selectAll("g.y.axis")
            .call(config.yAxis);
        }
      }

      ctrl.addListener(update.bind(this));
    }
  };
})
.service('ChartTransitions', function() {
  this.transition = function(entering, chart, transitions, config) {
    var onEnter = entering.transition();
    var transition = chart.transition();
    var exit = chart.exit();
    var onExit = exit.transition();

    if (transitions.onEnter) onEnter.call(transitions.onEnter.bind(onEnter, config));
    if (transitions.onTransition) transition.call(transitions.onTransition.bind(transition, config));
    if (transitions.onExit) onExit.call(transitions.onExit.bind(onExit, config));
  };
});
