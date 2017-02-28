const app = angular.module('capstone', ['ngRoute']);

app.config(function($routeProvider) {

  var config = {
    apiKey: "AIzaSyCfGG895XjzDJ01lzeCjAOALA15f_E2Tik",
    authDomain: "front-end-capstone-b8669.firebaseapp.com",
    databaseURL: "https://front-end-capstone-b8669.firebaseio.com",
    storageBucket: "front-end-capstone-b8669.appspot.com",
    messagingSenderId: "298909880690"
  };
  firebase.initializeApp(config);

  const userStatus = {
    authState: function($location) {
      console.log("welcome");
      const unsubscribe = firebase.auth().onAuthStateChanged(user =>{
        unsubscribe();
        console.log("userStatus", user);
        if (!user) {
          $location.url('/');
        }
      });
    }
  };

  $routeProvider

    .when("/", {
    templateUrl: "/app/partials/login.html",
    controller: 'loginCtrl',
  })

  .when("/register", {
    templateUrl: "/app/partials/register.html",
    controller: 'registerCtrl',
  })

  .when("/home", {
    templateUrl: "/app/partials/landing.html",
    controller: 'mainCtrl',
  })

  .when("/list", {
    templateUrl: "/app/partials/list.html",
    controller: 'listCtrl',
  })

  .when("/new", {
    templateUrl: "/app/partials/newRecipe.html",
    controller: 'newRecipeCtrl',
  })

  .when("/view/:recipeId", {
    templateUrl: "/app/partials/view.html",
    controller: 'viewCtrl',
  })

  .when("/edit/:recipeId", {
    templateUrl: "/app/partials/edit.html",
    controller: "editCtrl",
  })

  .otherwise ({
    redirectTo: '/'
  });
});
