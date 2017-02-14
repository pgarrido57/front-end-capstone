const app = angular.module('Capstone', ['ngRoute', 'ngAnimate']);

app.config(function($routeProvider) {

  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyCfGG895XjzDJ01lzeCjAOALA15f_E2Tik",
    authDomain: "front-end-capstone-b8669.firebaseapp.com",
    databaseURL: "https://front-end-capstone-b8669.firebaseio.com",
    storageBucket: "front-end-capstone-b8669.appspot.com",
    messagingSenderId: "298909880690"
  });

  // this checks to make sure user is signed in
  const userStatus = {
    authState: function($location) {
      console.log("welcome");
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        unsubscribe();
        console.log("userStatus", user);
        if (!user) {
          $location.url('/');
        }
      });
    }
  };

  $routeProvider
    .when('/', {
      controller: 'loginCtrl',
      templateUrl: '/app/partials/login.html'
    })
    .when('/register', {
      controller: 'registerCtrl',
      templateUrl: '/app/partials/register.html',
    })
    .when("/list", {
      templateUrl: "/app/partials/list.html",
      controller: 'listCtrl',
      controllerAs: 'list'
    })
    .when("/home", {
      templateUrl: "/app/partials/main.html",
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
      templateUrl: "/app/partials/view.html",
      controller: "editCtrl",
      controllerAs: 'rec'
    })
    .otherwise({
      redirectTo: '/'
    });
});
