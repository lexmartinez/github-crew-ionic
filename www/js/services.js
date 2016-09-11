angular.module('github-crew.services', [])

.factory('PeopleService', function($http) {

  return {
    all: function() {
      return $http.get('https://github-crew.herokuapp.com/api/advisor/tgtfrr?access_token=681a4a88tt69ab20dfde752b9481e9dcb2b5cf9653&max=10');
    },
    repos:function(url){
        return $http.get(url);
    }
  };
});
