angular.module('dashkiosk.controllers')
  .controller('GroupsCtrl', function($scope, groups, $location, $http) {
    'use strict';

    $scope.host = $location.protocol() + '://' + $location.host() + ':' + $location.port();
    $scope.groups = groups;
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
      //console.log('Moved', name, 'to the end');
    };
  });
