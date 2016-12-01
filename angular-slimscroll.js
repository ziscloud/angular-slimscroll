angular.module('ui.slimscroll', []).directive('slimscroll', ['$timeout', '$window', function ($timeout, $window) {
  'use strict';

  return {
    restrict: 'A',
    link: function ($scope, $elem, $attr) {
      var off = [];
      var option = {};

      var refresh = function () {

          var isEventBound = false;

          $timeout(function () {
              if (angular.isDefined($attr.slimscroll)) {
                  option = $scope.$eval($attr.slimscroll) || {};
              } else if ($attr.slimscrollOption) {
                  option = $scope.$eval($attr.slimscrollOption) || {};
              }

              var el = angular.element($elem);

              el.slimScroll({ destroy: true });

              if (option.onScroll && !isEventBound) {
                el.slimScroll(option).bind('slimscrolling', function(e, pos) {
                  option.onScroll();
                  isEventBound = true;
                });
              } else {
                el.slimScroll(option);
              }
          });
      };

      angular.element($window).bind('resize', function() {
          if ($attr.slimscroll) {
              option = $scope.$eval($attr.slimscroll);
            } else if ($attr.slimscrollOption) {
              option = $scope.$eval($attr.slimscrollOption);
            }

           $($elem).slimScroll(option);
       });

      var registerWatch = function () {
        if (angular.isDefined($attr.slimscroll) && !option.noWatch) {
          off.push($scope.$watchCollection($attr.slimscroll, refresh));
        }

        if ($attr.slimscrollWatch) {
          off.push($scope.$watchCollection($attr.slimscrollWatch, refresh));
        }

        if ($attr.slimscrolllistento) {
          off.push($scope.$on($attr.slimscrolllistento, refresh));
        }
      };

      var destructor = function () {
        angular.element($elem).slimScroll({destroy: true});
        off.forEach(function (unbind) {
          unbind();
        });
        off = null;
      };

      off.push($scope.$on('$destroy', destructor));

      registerWatch();
    }
  };
}]);
