'use strict';

angular.module('capstone')
  .factory('DataService', DataService);


DataService.$inject = ['$http', '$firebaseArray', '$q'];

function DataService($http, $firebaseArray, $q) {

  var fireUrl = "https://front-end-capstone-b8669.firebaseio.com"
  var ref = new Firebase(fireUrl);

  var recipes = [];
  var recTags = [];



  var service = {
    getTags: getTags,
    getRecentRecipes: getRecentRecipes,
    addNewTag: addNewTag,
    addNewRecipe: addNewRecipe,
    getRecipe: getRecipe,
    updateRecipe: updateRecipe
  };
  return service;


  function getTags() {


    var deferred = $q.defer();
    recTags = $firebaseArray(ref.child("tags")).$loaded().then(function(tagData) {
      var mappedArr = tagData.map(function(d) {
        return {
          TagName: d.TagName,
          TagId: d.$id
        }
      });
      deferred.resolve(mappedArr);
    });
    return deferred.promise;

  }

  function addNewTag(tagName) {



    recTags = $firebaseArray(ref.child("tags"));
    recTags.$add({
      TagName: tagName
    });



  }

  function getRecentRecipes() {

    var deferred = $q.defer();
    recipes = $firebaseArray(ref.child("recipes")).$loaded().then(function(tagData) {
      var mappedArr = tagData.map(function(d) {
        return {
          RecipeName: d.RecipeName,
          RecipeId: d.$id
        }
      });
      deferred.resolve(mappedArr);
    });
    return deferred.promise;
  }




  function addNewRecipe(rec) {
    var deferred = $q.defer();

    var existing = $firebaseArray(ref.child("recipes"));
    existing.$add(rec);
    deferred.resolve('success');

    return deferred.promise;
  }

  function getRecipe(recipeId) {

    var deferred = $q.defer();
    recipes = $firebaseArray(ref.child("recipes")).$loaded().then(function(recData) {

      var reci = recData.$getRecord(recipeId);
      deferred.resolve(reci);
    });
    return deferred.promise;
  }

  function updateRecipe(recipe) {

    var deferred = $q.defer();
    console.info(recipe.$id);
    var oldRec = new Firebase(fireUrl + "/recipes/" + recipe.$id);
    console.log(oldRec);
    deferred.resolve("success");

    return deferred.promise;
  }
};
