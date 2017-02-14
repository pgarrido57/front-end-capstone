app.controller('viewCtrl', function(firebaseFactory, $location, $routeParams) {
  console.log('viewCtrl');
  var vm = this;
  vm.recipe = {};

  var recipeId = $routeParams.recipeId;
  firebaseFactory.getRecipe(recipeId).then(function(data) {
    vm.recipe = data;
  });

  vm.commenceEditing = function() {
    console.log(recipeId);
    $location.path('/edit/' + recipeId);

  };
});
