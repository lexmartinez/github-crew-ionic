angular.module('github-crew.controllers', [])


.controller('AboutCtrl', function($scope, $rootScope, $state) {
  if(!$rootScope.token){
     $state.go('login');
  }
 })

.controller('PeopleCtrl', function($scope, $state, $http, $cordovaOauth, $rootScope, $ionicPopup,  PeopleService) {

  $rootScope.people = [];
  $scope.firtsLoading = true;

  $scope.remove = function(profile) {
    $rootScope.people.splice($rootScope.people.indexOf(profile), 1);
  };

  $scope.login = function(){

    $cordovaOauth.github("15d50f176b32e8b4f00f", "13cbfeb2f7f0139d1c6b6d1771485dfa17de3bcb",["user"]).then(function(result) {

      $http.get("https://api.github.com/user", {params: {access_token: result.access_token }})
     .then(function(res) {

       $rootScope.token = result.access_token;
       $rootScope.username = res.data.login;
       $state.go('tab.people');
       $scope.refreshPeopleData();

     }, function(error) {
       $ionicPopup.alert({
          title: 'github-crew',
          template: error
        });
     });

 },function(error) {
   $ionicPopup.alert({
      title: 'github-crew',
      template: error
    });
   });

  };

  $scope.logout = function(){
    $rootScope.token = undefined;
    $rootScope.username = undefined;
    $state.go('login');
    $rootScope.people = [];
  };

  $scope.refreshPeopleData = function(){
    PeopleService.all($rootScope.username,$rootScope.token).then(
        function(response){
              $rootScope.people = response.data;
        }, function(data){
          $ionicPopup.alert({
             title: 'github-crew',
             template: 'error loading people list'
           });
      }).finally(function() {
       if($scope.firtsLoading){
         $scope.firtsLoading = false;
       }
       $scope.$broadcast('scroll.refreshComplete');
     });
  };

  if(!$rootScope.token){
     $state.go('login');
  }

})

.controller('ProfileDetailCtrl', function($scope, $state, $http, $rootScope, $ionicPopup, $stateParams, PeopleService) {

      $scope.profile = {};
      $scope.repos = [];
      $scope.enableButton = false;

      if(!$rootScope.token){
         $state.go('login');
      }

      $scope.showProfile = function(){
        $scope.repos = [];
        if($rootScope.people){
           var id =  $stateParams.peopleId;
           for(var i=0;i<$rootScope.people.length;i++){
             if($rootScope.people[i].id == id){
                $scope.profile = $rootScope.people[i];
                $scope.enableButton = true;
                PeopleService.repos($scope.profile.repos_url).then(
                    function(response){
                          $scope.repos = response.data;
                    }, function(data){
                      $ionicPopup.alert({
                         title: 'github-crew',
                         template: 'error loading repo list'
                       });
                  });

                return;
             }
           }
         }
      };

      $scope.follow = function(){
         if($scope.profile){
           PeopleService.follow($scope.profile.login, $rootScope.token).then(
               function(response){
                     $rootScope.people.splice($rootScope.people.indexOf($scope.profile), 1);
                     $scope.enableButton = false;
               }, function(data){
                 $ionicPopup.alert({
                    title: 'github-crew',
                    template: 'error following profile'
                  });
             })
         }
      }

      $scope.showProfile();
});
