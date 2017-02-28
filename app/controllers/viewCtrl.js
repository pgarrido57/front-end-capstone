angular.module('capstone')
app.controller('viewCtrl', function($scope, $location, $routeParams, firebaseFactory) {

  $scope.recipe = {};

  firebaseFactory.getRecipeDetail($routeParams.recipeid)
  .then(function(data) {
    $scope.recipe = data;
  });

  $scope.startEditing = function() {
    console.log(recipe.id);
    $location.path('/edit/' + recipe.id);

  };
});
