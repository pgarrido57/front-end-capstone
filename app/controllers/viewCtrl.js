(function() {

  'use strict';

  angular.module('Capstone').controller('viewCtrl', viewCtrl);

  viewCtrl.$inject= ['firebaseFactory', '$location', '$routeParams'];

  function viewCtrl(firebaseFactory, $location, $routeParams) {

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

  }

})();
