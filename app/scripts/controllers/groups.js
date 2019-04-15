angular.module('dashkiosk.controllers')
  .controller('GroupsCtrl', function($scope, groups, $location, $http) {
    'use strict';

    $scope.host = $location.protocol() + '://' + $location.host() + ':' + $location.port();
    $scope.groups = groups;
    $scope.formattedGroups = [];
    var i = 0;
    for (var item in $scope.groups) {
      if ({}.toString.call($scope.groups[item]) !== '[object Function]') {
        $scope.formattedGroups[i] = $scope.groups[item];
        i++;
      }
    }
    $scope.formattedGroups.sort((a, b) => (a.rank > b.rank) ? 1 : ((b.rank > a.rank) ? -1 : 0));
    $scope.createGroup = function() {
      var random = (function(length) {
        var bits = 36,
        tmp,
        out = '';
        while (out.length < length) {
          tmp = Math.random().toString(bits).slice(2);
          out += tmp.slice(0, Math.min(tmp.length, (length - out.length)));
        }
        return out.toUpperCase();
      })(6);
      groups.$add({ name: 'New group ' + random,
      description: 'Newly created group' });
    };
    $scope.moveGroupToEnd = function(name) {
      return $http
        .put('/api/group/rank/' + name, JSON.stringify({
          drop: -1,
        }), {})
        .then(function () { console.log('done'); return false; })
        .catch(function (err) {
          console.log(err);
          return false;
        });
    };
  });
