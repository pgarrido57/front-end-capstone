app.controller('listCtrl', function(firebaseFactory, $location) {
  console.log('listCtrl');
  var vm = this;
  vm.tags = [];
  vm.recipes = [];
  vm.name = "list";

  firebaseFactory.getTags().then(function(data) {
    vm.tags = data;
  });


  firebaseFactory.getRecentRecipes().then(function(data) {
    vm.recipes = data;
  });


  vm.goToRecipe = function(recipe) {

    $location.path('/view' + recipe);
  };
});
