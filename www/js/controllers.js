angular.module('github-crew.controllers', [])

.controller('AboutCtrl', function($scope) {})

.controller('PeopleCtrl', function($scope, $rootScope, $ionicPopup,  PeopleService) {

  $rootScope.people = [];
  $scope.firtsLoading = true;

  $scope.remove = function(profile) {
    $rootScope.people.splice($scope.people.indexOf(profile), 1);
  };

  $scope.refreshPeopleData = function(){
    PeopleService.all().then(
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

      $scope.showProfile = function(){
        $scope.repos = [];
        if($rootScope.people){
           var id =  $stateParams.peopleId;
           for(var i=0;i<$rootScope.people.length;i++){
             if($rootScope.people[i].id == id){
                $scope.profile = $rootScope.people[i];

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

      $scope.showProfile();
});
