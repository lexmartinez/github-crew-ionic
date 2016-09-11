angular.module('github-crew.services', [])

.factory('PeopleService', function($http) {

  return {
    all: function() {
      return $http.get('https://github-crew.herokuapp.com/api/advisor/hyrrt?access_token=7bc47a4d71b8322bc9a5fddd873f3e4c6a1563ea90c&max=10');
    },
    repos:function(url){
        return $http.get(url);
    }
  };
});
