'use strict';

angular.module('capstone').controller('editCtrl', editCtrl);

editCtrl.$inject = ['DataService', '$location', '$routeParams'];

function editCtrl(DataService, $location, $routeParams) {

  var vm = this;

  vm.name = "recipe";
  var instructionCounter = 0;

  console.info('edit loaded');
  vm.recipeId = $routeParams.recipeId;


  DataService.getTags().then(function(data) {
    vm.allTags = data;

    DataService.getRecipe(vm.recipeId).then(function(data) {
      console.log(data);
      vm.recipe = data;

      var selectedRecipes = data.Tags.map(function(y) {
        return y.TagId;
      });

      instructionCounter = vm.recipe.Instructions.length;

      for (var i = 0; i < vm.allTags.length; i++) {
        if (selectedRecipes.indexOf(vm.allTags[i].TagId) < 0) {
          vm.allTags[i].Selected = true;
        }
      }
    });
  });

  vm.addNewInstruction = function() {
    instructionCounter++;
    vm.recipe.Instructions.push({
      id: instructionCounter,
      instructions: ""
    });
  };

  vm.addNewGroup = function() {
    var newGroup = {
      'Title': '',
      'RecipeId': 0,
      'Ingredients': [{
        'Ingredient': ''
      }]
    };
    if (vm.recipe.Ingredients === undefined) {
      vm.recipe.Ingredients = [];
    }

    vm.recipe.Ingredients.push(newGroup);

  };

  vm.addNewIngredient = function(group) {
    var index = vm.recipe.Ingredients.indexOf(group);
    var newIng = {
      'Ingredient': ''
    };
    vm.recipe.Ingredients[index].Ingredients.push(newIng);
  };

  vm.deleteIngredient = function(ing, group) {
    vm.recipe.Ingredients[group].Ingredients.splice(ing, 1);
  };

  vm.update = function() {
    DataService.updateRecipe(vm.recipe).then(function(data) {
      $location.path('/view/' + vm.recipeId);
    });
  }

  vm.cancelEdit = function() {
    $location.path('/view/' + vm.recipeId);
  }
};
