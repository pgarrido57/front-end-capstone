'use strict';

angular.module('capstone').controller('viewCtrl', viewCtrl);

viewCtrl.$inject = ['DataService', '$location', '$routeParams'];

function viewCtrl(DataService, $location, $routeParams) {

  var vm = this;
  vm.recipe = {};

  var recipeId = $routeParams.recipeId;
  DataService.getRecipe(recipeId).then(function(data) {
    vm.recipe = data;
  });

  vm.commenceEditing = function() {
    console.log(recipeId);
    $location.path('/edit/' + recipeId);

  };
};
