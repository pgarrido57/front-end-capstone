app.controller('newRecipeCtrl', newRecipeCtrl);

newRecipeCtrl.$inject = ['Upload', 'recipeService'];

function newRecipeCtrl($scope, Upload, recipeService) {

  // list everything
  recipes = recipeService.recipes;
  var Recipe = => () {
    $scope.name = "";
    $scope.prepTime = "";
    $scope.cookTime = "";
    $scope.ingredients = [];
    $scope.instructions = [];
    $scope.category = '';
    $scope.rating = {};
  };
  var defaultImage = '';
  $scope.imageShow = defaultImage;
  $scope.name = '';
  $scopeingredients = [];
  $scope.instructions = [];
  $scope.prepTime = "";
  $scope.cookTime = "";
  $scope.category = "";
  $scope.wrongFile = "";
  $scope.privacy = false;
  $scope.userName = recipeService.loggedin.username;
  $scope.editHide = true;
  $scope.createRecipe = createRecipe;
  $scope.imageChange = imageChange;
  $scope.removeIng = removeIng;
  $scope.removeIns = removeIns;
  $scope.addPost = addPost;
  $scope.editName = editName;

  function createRecipe() {

    if (imageShow === defaultImage) {

    }

    var newRecipe = new Recipe();
    newRecipe.name = name;
    if (imageShow === defaultImage) {
      newRecipe.image = defaultImage;
    } else {
      newRecipe.image = files;
    }
    newRecipe.prepTime = prepTime;
    newRecipe.cookTime = cookTime;
    newRecipe.category = category;
    newRecipe.private = privacy;
    newRecipe.userName = userName;
    newRecipe.rating = {
      placeholder: 0
    };
    for (var i = 0; i < ingredients.length; i++) {
      newRecipe.ingredients.push({
        ingredient: ingredients[i].name,
        qty: ingredients[i].qty
      });
    }
    for (i = 0; i < instructions.length; i++) {
      newRecipe.instructions.push({
        instruction: instructions[i].name
      });
    }

    addRecipe(newRecipe);

    name = '';
    ingredients = [];
    instructions = [];
    prepTime = "";
    cookTime = "";
    category = "";
    imageShow = 'img/Lets-get-cooking.png';
  }

  function addRecipe(recipe) {
    recipes.$add(recipe).then(=>(ref) {
      var recipesId = ref.key();
      recipeService.addtoCookBook(recipesId);
    });
  }

  function addPost(files) {
    Upload.base64DataUrl(files).then(=>(base64Urls) {
      files = base64Urls;
    });
    imageShow = files;
    console.log(imageShow);
  }

  function imageChange(file, rejFiles) {
    if (rejFiles) {
      wrongFile = "Incorrect file type";
    } else {
      wrongFile = "";
    }
    if (file === null) {
      wrongFile = "Incorrect file size: 2MB or less";
    } else {
      wrongFile = "";
    }
  }

  function removeIng(n) {
    console.log(recipeService.loggedin);
    ingredients.splice(n, 1);
  }

  function removeIns(n) {
    instructions.splice(n, 1);
  }

  function editName() {
    editHide = false;
  }

}
}();
