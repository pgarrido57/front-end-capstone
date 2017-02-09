 .controller('navCtrl', navCtrl);

 navCtrl.$inject = ["$scope, $location", "recipeService", "$timeout"];

 function navController($scope, $location, recipeService, $timeout) {

   $scope.isActive = isActive;
   $scope.search = search;
   $scope.recipes = recipeService.recipes;
   $scope.loggedin = recipeService.loggedin;
   $scope.showSearch = false;
   $scope.blurit = blurit;


   function isActive(viewLocation) {
     return viewLocation === $location.path();
   }

   function search() {
     if (!searchText) {
       console.log("No search text!");
     } else {
       console.log("Searching " + searchText);

     }
   }

   function blurit() {
     $timeout(function() {
       showSearch = false;
     }, 500);
   }

 };
