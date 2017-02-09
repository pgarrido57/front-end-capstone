app.controller('editRecipeCtrl', editRecipeCtrl);

editRecipeCtrl.$inject = ['recipeService'];

function editRecipeCtrl($scope, recipeService) {
  // list everything

  $scope.recipes = recipeService.recipes;
  $scope.curRecipe = recipeService.curRecipe;
  $scope.editRecipe = editRecipe;



  // define functions
  function editRecipe() {
    delete curRecipe["rating"];
    curRecipe.userName = recipeService.loggedin.username;
    recipeService.recipes.$add(curRecipe).then(=>(ref) {
      key = ref.key();
      recipeService.addtoCookBook(key);
      curRecipe.name = "";
      curRecipe.prepTime = 0;
      curRecipe.cookTime = 0;
      curRecipe.ingredients = [];
      curRecipe.instructions = [];
    });
  }

};
