angular.module('capstone')
app.controller('editCtrl', function($scope, $location, $routeParams, firebaseFactory) {

  $scope.name = "recipe";
  var instructionCounter = 0;

  console.info('edit loaded');
  $scope.recipeId = $routeParams.recipeId;


  // firebaseFactory.getTags().then(function(data) {
  //   $scope.allTags = data;

    firebaseFactory.getRecipe($scope.recipe.id).then(function(data) {
      console.log(data);
      $scope.recipe = data;

      instructionCounter = $scope.recipe.Instructions.length;

      for (var i = 0; i < $scope.allTags.length; i++) {
        if (selectedRecipes.indexOf($scope.allTags[i].TagId) < 0) {
          $scope.allTags[i].Selected = true;
        }
      }
    });
  });

  $scope.addNewInstruction = function() {
    instructionCounter++;
    $scope.recipe.Instructions.push({
      id: instructionCounter,
      instructions: ""
    });
  };

  // $scope.deleteInstruction = function(ing, group) {
  //   $scope.recipe.Instruction[group].Instruction.splice(ing, 1);
  // };

  $scope.addNewGroup = function() {
    var newGroup = {
      'Title': '',
      'RecipeId': 0,
      'Ingredients': [{
        'Ingredient': ''
      }]
    };
    if ($scope.recipe.Ingredients === undefined) {
      $scope.recipe.Ingredients = [];
    }

    $scope.recipe.Ingredients.push(newGroup);

  };

  $scope.addNewIngredient = function(group) {
    var index = $scope.recipe.Ingredients.indexOf(group);
    var newIng = {
      'Ingredient': ''
    };
    $scope.recipe.Ingredients[index].Ingredients.push(newIng);
  };

  $scope.deleteIngredient = function(ing, group) {
    $scope.recipe.Ingredients[group].Ingredients.splice(ing, 1);
  };

  $scope.update = function() {
    firebaseFactory.updateRecipe($scope.recipe).then(function(data) {
      $location.path('/view/' + $scope.recipeId);
    });
  }

  $scope.cancelEdit = function() {
    $location.path('/view/' + $scope.recipeId);
  }
