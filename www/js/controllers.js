angular.module('github-crew.controllers', [])

.controller('AboutCtrl', function($scope) {})

.controller('PeopleCtrl', function($scope, $rootScope, $ionicPopup,  PeopleService) {

  $rootScope.people = [];
  $scope.firtsLoading = true;
  $rootScope.token = '681a4a8869ab20dfde752b9481e9dcb2b5dacf9653';
  $rootScope.username = "asdasjndasudasn";

  $scope.remove = function(profile) {
    $rootScope.people.splice($rootScope.people.indexOf(profile), 1);
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
       $scope.$broadcast('scroll.refreshComplete');
       if($scope.firtsLoading){
         $scope.firtsLoading = false;
       }
     });
  };

  $scope.refreshPeopleData();
})

.controller('ProfileDetailCtrl', function($scope, $http, $rootScope, $ionicPopup, $stateParams, PeopleService) {

      $scope.profile = {};
      $scope.repos = [];
      $scope.enableButton = false;

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
