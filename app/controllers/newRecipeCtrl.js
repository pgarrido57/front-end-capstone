angular.module('capstone')
app.controller('newRecipeCtrl', function($scope, $location, DataService) {

  $scope.name = "recipe";

  $scope.foodTags = [];

  DataService.getTags().then(function(data) {
    $scope.foodTags = data;
  });

  var instructionCounter = 1;
  $scope.recipeTags = [];
  $scope.ingredients = [];
  $scope.instructions = [{
    id: 1,
    instructions: ""
  }];

  $scope.newRecipe = {
    'RecipeName': '',
    'RecipeId': '',
    'Description': '',
    'ServingSize': ''
  };

  $scope.addNewRecipe = function() {

    var cleanedTags = $scope.recipeTags.map(function(x) {
      return {
        TagName: x.TagName,
        TagId: x.TagId
      }
    });


    console.table($scope.newRecipe)
    var newRec = {
      RecipeName: $scope.newRecipe.RecipeName,
      Description: $scope.newRecipe.Description,
      ServingSize: $scope.newRecipe.ServingSize,
      Ingredients: $scope.ingredients,
      Instructions: $scope.instructions,
      Tags: cleanedTags
    };

    DataService.addNewRecipe(newRec).then(function(data) {
      $location.path('list');
    });


  };

  $scope.addNewInstruction = function() {
    instructionCounter++;
    $scope.instructions.push({
      id: instructionCounter,
      instructions: ""
    });
  };


  $scope.addNewGroup = function() {
    var newGroup = {
      'Title': '',
      'RecipeId': 0,
      'Ingredients': [{
        'Ingredient': ''
      }]
    };
    $scope.ingredients.push(newGroup);
  };

  $scope.addNewIngredient = function(group) {
    var index = $scope.ingredients.indexOf(group);
    var newIng = {
      'Ingredient': ''
    };
    $scope.ingredients[index].Ingredients.push(newIng);
  }

  $scope.deleteIngredient = function(ing, group) {
    $scope.ingredients[group].Ingredients.splice(ing, 1);
  };

  $scope.toggleSelection = function(myTag) {
    myTag.Selected = !myTag.Selected;

    var idx = -1;
    for (var i = 0; i < $scope.recipeTags.length; i++) {
      if ($scope.recipeTags[i].TagId == myTag.TagId) {
        idx = i;
      }
    }
    if (idx > -1) {
      $scope.recipeTags.splice(idx, 1);
    } else {
      $scope.recipeTags.push(myTag);
    }
  };
  $scope.cancelEdit = function() {
    $location.path('/list');
  }
});
