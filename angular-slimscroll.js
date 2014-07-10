angular.module('ui.slimscroll', []).directive('slimscroll', function() {
  return {
    restrict: 'A',
    link: function($scope, $elem, $attr) {
      var refresh = function() {
        var option = {};
        if ($attr.slimscroll) {
          option = $scope.$eval($attr.slimscroll);
        } else if ($attr.slimscrollOption) {
          option = $scope.$eval($attr.slimscrollOption);
        }
        $elem.slimScroll({ destroy: true });
        $elem.slimScroll(option);
      };

      refresh();

      if ($attr.slimscrollWatch) {
        $scope.$watchCollection($attr.slimscrollWatch, refresh);
      }

      if ($attr.slimscrollListenTo) {
        $scope.on($attr.slimscrollListenTo, refresh);
      }
    }
  };
});
