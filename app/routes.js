'use strict';

angular.module('capstone')
  .config(function($routeProvider) {

    $routeProvider

      .when("/", {
      templateUrl: "/app/partials/login.html",
      controller: 'loginCtrl',
      controllerAs: 'log'
    })

    .when("/register", {
      templateUrl: "/app/partials/register.html",
      controller: 'registerCtrl',
      controllerAs: 'reg'
    })

    .when("/home", {
      templateUrl: "/app/partials/landing.html",
      controller: 'mainCtrl',
      controllerAs: 'main'
    })

    .when("/list", {
      templateUrl: "/app/partials/list.html",
      controller: 'listCtrl',
      controllerAs: 'list'
    })

    .when("/new", {
      templateUrl: "/app/partials/newRecipe.html",
      controller: 'newRecipeCtrl',
      controllerAs: 'rec'
    })

    .when("/view/:recipeId", {
      templateUrl: "/app/partials/view.html",
      controller: 'viewCtrl',
      controllerAs: 'view'
    })

    .when("/edit/:recipeId", {
      templateUrl: "/app/partials/edit.html",
      controller: "editCtrl",
      controllerAs: 'rec'
    });
  });
