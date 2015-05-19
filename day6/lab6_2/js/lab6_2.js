angular.module('myApp', [])
 .controller('pageCtrl', ['$scope', function($scope) {
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.total = 1000;
    $scope.dots = '...';
    $scope.adjacent = 2;
    $scope.ulClass = 'pagination';
    $scope.activeClass = 'active';
    $scope.disabledClass = 'disabled';
    $scope.hideIfEmpty = true;
    $scope.scrollTop = true;
    $scope.showPrevNext = true;
    
    $scope.showPagingParams = function(text, page, pageSize, total) {
        console.log({text, page, pageSize, total});
     };
 }])
 .directive('paging', function() {
  
  // Assign null-able scope values from settings
    function setScopeValues(scope, attrs) {
        scope.List = [];
        scope.Hide = false;
        scope.dots = scope.dots || '...';
        scope.page = parseInt(scope.page) || 1;
        scope.total = parseInt(scope.total) || 0;
        scope.ulClass = scope.ulClass || 'pagination';
        scope.adjacent = parseInt(scope.adjacent) || 2;
        scope.activeClass = scope.activeClass || 'active';
        scope.disabledClass = scope.disabledClass || 'disabled';
        scope.scrollTop = scope.$eval(attrs.scrollTop);
        scope.hideIfEmpty = scope.$eval(attrs.hideIfEmpty);
        scope.showPrevNext = scope.$eval(attrs.showPrevNext);

    }

    function validateScopeValues(scope, pageCount) {
        if(scope.page > pageCount)    scope.page = pageCount;
        if(scope.page <= 0)   scope.page = 1;
        if(scope.adjacent <= 0)  scope.adjacent = 2;
        if(pageCount <= 1)   scope.Hide = scope.hideIfEmpty;
    }


    function internalAction(scope, page) {
        if(scope.page == page)   return;
        scope.page = page;
      
        scope.pagingAction({
            page: scope.page,
            pageSize: scope.pageSize,
            total: scope.total
        });
        if(scope.scrollTop)  scrollTo(0, 0);
    }

    function addPrev(scope, pageCount) {
        if(!scope.showPrevNext || pageCount < 1)   return;
        var disabled = scope.page - 1 <= 0;
        var prevPage = scope.page - 1 <= 0 ? 1 : scope.page - 1;

        var first = {
            value: '<<',
            title: 'First Page',
            liClass: disabled ? scope.disabledClass : '',
            action: function () {
                if(!disabled) {
                    internalAction(scope, 1);
                }
            }
        };

        var prev = {
            value: '<',
            title: 'Previous Page',
            liClass: disabled ? scope.disabledClass : '',
            action: function () {
                if(!disabled) {
                    internalAction(scope, prevPage);
                }
            }
        };
        scope.List.push(first);
        scope.List.push(prev);
    }

    function addNext(scope, pageCount) {
        if(!scope.showPrevNext || pageCount < 1)    return;
        var disabled = scope.page + 1 > pageCount;
        var nextPage = scope.page + 1 >= pageCount ? pageCount : scope.page + 1;

        var last = {
            value: '>>',
            title: 'Last Page',
            liClass: disabled ? scope.disabledClass : '',
            action: function () {
                if(!disabled){
                    internalAction(scope, pageCount);
                }
            }
        };

        var next = {
            value: '>',
            title: 'Next Page',
            liClass: disabled ? scope.disabledClass : '',
            action: function () {
                if(!disabled){
                    internalAction(scope, nextPage);
                }
            }
        };
        scope.List.push(next);
        scope.List.push(last);
    }

    function addRange(start, finish, scope) {
        var i = 0;
        for (i = start; i <= finish; i++) {
            var item = {
                value: i,
                title: 'Page ' + i,
                liClass: scope.page == i ? scope.activeClass : '',
                action: function () {
                    internalAction(scope, this.value);
                }
            };

            scope.List.push(item);
        }
    }

    function addDots(scope) {
        scope.List.push({
            value: scope.dots
        });
    }

    function addFirst(scope, next) {
        addRange(1, 2, scope);
        if(next != 3)   addDots(scope);
    }

    function addLast(pageCount, scope, prev) {
        if(prev != pageCount - 2)  addDots(scope);
        addRange(pageCount - 1, pageCount, scope);
    }
  
    // Main build function
    function build(scope, attrs) {
        if (!scope.pageSize || scope.pageSize < 0)  return;
        setScopeValues(scope, attrs);
        var start,
            size = scope.adjacent * 2,
            pageCount = Math.ceil(scope.total / scope.pageSize);

        // Validate Scope
        validateScopeValues(scope, pageCount);

        // Calculate Counts and display
        addPrev(scope, pageCount);
        if(pageCount < (5 + size)) {
            start = 1;
            addRange(start, pageCount, scope);
        } 
      else {
            var finish;
            if (scope.page <= (1 + size)) {
                start = 1;
                finish = 2 + size + (scope.adjacent - 1);
                addRange(start, finish, scope);
                addLast(pageCount, scope, finish);
            } 
            else if(pageCount - size > scope.page && scope.page > size) {
                start = scope.page - scope.adjacent;
                finish = scope.page + scope.adjacent;
                addFirst(scope, start);
                addRange(start, finish, scope);
                addLast(pageCount, scope, finish);

            } 
            else {
                start = pageCount - (1 + size + (scope.adjacent - 1));
                finish = pageCount;
                addFirst(scope, start);
                addRange(start, finish, scope);
            }
        }
        addNext(scope, pageCount);
    }
  
   return {
        restrict: 'EA',
        scope: {
            page: '=',
            pageSize: '=',
            total: '=',
            dots: '@',
            hideIfEmpty: '@',
            ulClass: '@',
            activeClass: '@',
            disabledClass: '@',
            adjacent: '@',
            scrollTop: '@',
            showPrevNext: '@',
            pagingAction: '&'
        },
        template: 
            '<ul ng-hide="Hide" ng-class="ulClass"> ' +
                '<li ' +
                    'title="{{Item.title}}" ' +
                    'ng-class="Item.liClass" ' +
                    'ng-click="Item.action()" ' +
                    'ng-repeat="Item in List"> ' +
                    '<span ng-bind="Item.value"></span> ' +
                '</li>' +
            '</ul>',
        link: function (scope, element, attrs) {            
            // Hook in our watched items 
            scope.$watchCollection('[page,pageSize,total]', function () {
                build(scope, attrs);
            });
        }
    };
});
