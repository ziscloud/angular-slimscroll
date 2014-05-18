angular.module('ui.slimscroll', []).directive('slimscroll', function() {
  return {
    restrict: 'A',
    link: function($scope, $elem, $attr) {
      var option = {};
      var refresh = function() {
        $elem.slimScroll(option);
      };

      if ($attr.slimscrollOption != null) {
        option = $scope.$eval($attr.slimscrollOption);
      }

      $elem.slimScroll(option);

      if ($attr.slimscrollWatch) {
        $scope.$watchCollection($attr.slimscrollWatch, refresh);
      }

      if ($attr.slimscrollListenTo) {
        $scope.on($attr.slimscrollListenTo, refresh);
      }
    }
  };
});