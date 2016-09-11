angular.module('github-crew.services', [])

.factory('PeopleService', function($http) {

  return {
    all: function(username,token) {
      return $http.get('https://github-crew.herokuapp.com/api/advisor/'+username+'?access_token='+token+'&max=10');
    },
    repos:function(url){
        return $http.get(url);
    },
    follow:function(profile, token){
        return $http({
          method: 'PUT',
          url: 'https://api.github.com/user/following/'+profile+'?access_token='+token
        });
    }
  };
});
