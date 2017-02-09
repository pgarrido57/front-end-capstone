app.controller('recipeCntrl', recipeCntrl);

function recipeCntrl($scope, recipeService, recipe, $firebase, $localStorage, $interval) {
  // list everything

  var num = 0;
  $scope.recipes = recipeService.recipes;
  $scope.recipe = recipe;
  $scope.loggedin = recipeService.loggedin;
  $scope.addToCookBookButton = recipeService.addToCookBookButton;
  $scope.initRecipe = initRecipe;
  $scope.addtoCookBook = addtoCookBook;
  $scope.editRecipe = editRecipe;
  $scope.star = star;
  $scope.getRating = getRating;

  console.log(addToCookBookButton);

  if (recipe == undefined) {
    recipe = $localStorage.curRecipe;
  }

  // define functions
  function initRecipe() {
    recipeService.initRecipe();
  }

  function addtoCookBook(id) {
    console.log(addToCookBookButton);
    recipeService.addtoCookBook(id);
    $('.add-button').css("display", "none");
  }

  function star(id, n) {
    var url = 'https://front-end-capstone-b8669.firebaseio.com';
    var fireURL = new Firebase(url + "/Recipes/" + id + '/rating');
    var fireRate = $firebase(fireURL);

    for (var i = 1; i <= n; i++) {
      var starId = '#' + i + 'star';
      $(starId).html("&#x2605");
      $(starId).css("color", "yellow");
    }

    var user = recipeService.loggedin.user;
    var newRate = {
      user: user,
      rating: n
    };
    fireRate.$loaded(function() {
      for (i = 0; i < fireRate.length; i++) {
        if (user === fireRate[i].user) {
          fireRate.$remove(fireRate[i]);
        }
      }
      fireRate.$add(newRate);
    });
    getRating(id);

  }

  function getRating(key) {
    $interval(function() {
      recipeService.getRating(key);
      rc.rating = recipeService.rateTotal;

    }, 800, 3).then(function() {
      for (var i = 1; i <= 5; i++) {
        var starId = '#' + i + 'star';
        $(starId).html('<i class="fa fa-star-o"></i>');
        $(starId).css("color", "black");
      }
      for (var i = 1; i <= rc.rating.rating; i++) {
        var starId = '#' + i + 'star';
        $(starId).html('<i class="fa fa-star"></i>');
        $(starId).css("color", "blue");
      }
    });


  }

  function editRecipe() {
    recipeService.curRecipe = $localStorage.curRecipe;
  }

};
