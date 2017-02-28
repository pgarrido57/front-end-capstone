angular.module('capstone')
app.controller('viewCtrl', function($scope, $location, $routeParams, firebaseFactory) {

  $scope.recipe = {};

  firebaseFactory.getRecipeDetail($routeParams.recipeId)
    .then(function(data) {
      $scope.recipe = data;
      $scope.recipeDetail = data[0]
      $scope.recipeName = data[3]
      $scope.servingSize = data[4]
      $scope.ingredients = data[1][0]
      $scope.instructions = data[2]
      console.log($scope.instructions)
    }).then(() => {
      $scope.$apply()
    });

  //   $scope.deleteRecipe = function(delete) {
  //   firebaseFactory.deleteSelected()
  // }

  $scope.startEditing = function() {
    console.log($scope.recipe.id);
    $location.path('/edit/' + $scope.recipe.id);

  };
});
