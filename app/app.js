'use strict';

const app = angular.module('capstone', ['ngRoute', 'firebase']);

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
    const unsubscribe = firebase.auth().$onAuth(callback)(user => {
      unsubscribe();
      console.log("userStatus", user);
      if (!user) {
        $location.url('/');
      }
    });
  }
};
