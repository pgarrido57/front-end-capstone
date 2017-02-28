angular.module('capstone')
app.controller('listCtrl', function($scope, $location, firebaseFactory) {

  $scope.tags = [];
  $scope.name = "list";

  firebaseFactory.getFirebaseRecipe()
    .then(function(data) {
      $scope.recipes = data;
      console.log(data)
    }).then(() => {
      $scope.$apply();
    });


  $scope.goToRecipe = function(recipe) {
    $location.path('/view/' + recipe);
  }

});
