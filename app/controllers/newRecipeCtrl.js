(function() {

  'use strict';

  angular.module('Capstone').controller('newRecipeCtrl', newRecipeCtrl);

  newRecipeCtrl.$inject = ['firebaseFactory', '$location'];

  function newRecipeCtrl(firebaseFactory, $location) {

    var vm = this;

    vm.name = "recipe";

    vm.foodTags = [];

    firebaseFactory.getTags().then(function(data) {
      vm.foodTags = data;
    });

    var instructionCounter = 1;
    vm.recipeTags = [];
    vm.ingredients = [];
    vm.instructions = [{
      id: 1,
      instructions: ""
    }];
    vm.newRecipe = {
      'RecipeName': 'dd',
      'RecipeId': '',
      'Description': '',
      'ServingSize': ''
    };


    vm.addNewRecipe = function() {

      var cleanedTags = vm.recipeTags.map(function(x) {
        return {
          TagName: x.TagName,
          TagId: x.TagId
        }
      });


      console.table(vm.newRecipe)
      var newRec = {
        RecipeName: vm.newRecipe.RecipeName,
        Description: vm.newRecipe.Description,
        ServingSize: vm.newRecipe.ServingSize,
        Ingredients: vm.ingredients,
        Instructions: vm.instructions,
        Tags: cleanedTags
      };

      firebaseFactory.addNewRecipe(newRec).then(function(data) {
        success("Saved Successfully");
        $location.path('list');
      });


    };

    vm.addNewInstruction = function() {
      instructionCounter++;
      vm.instructions.push({
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
      vm.ingredients.push(newGroup);
    };

    vm.addNewIngredient = function(group) {
      var index = vm.ingredients.indexOf(group);
      var newIng = {
        'Ingredient': ''
      };
      vm.ingredients[index].Ingredients.push(newIng);
    }

    vm.deleteIngredient = function(ing, group) {
      vm.ingredients[group].Ingredients.splice(ing, 1);
    };

    vm.toggleSelection = function(myTag) {
      myTag.Selected = !myTag.Selected;

      var idx = -1;
      for (var i = 0; i < vm.recipeTags.length; i++) {
        if (vm.recipeTags[i].TagId == myTag.TagId) {
          idx = i;
        }
      }
      if (idx > -1) {
        vm.recipeTags.splice(idx, 1);
      } else {
        vm.recipeTags.push(myTag);
      }

    };

  }

})();
