app.factory('firebaseFactory', function($http) {

  return {
    getFirebaseRecipe() {
      let stats = [];
        return new Promise((resolve, reject) => {
          $http
            .get('https://front-end-capstone-b8669.firebaseio.com/recipes.json')
            .then((data) => {
              console.log("factory data", data);
              res = data.data;
              Object.keys(res).forEach((key)=> {
                res[key].id = key;
                stats.push(res[key]);
              });
              console.log("stats", stats)
              resolve(stats);
            })
        })

      },
      getRecipeDetail(recipeId) {
        let stats = [];
        console.log(recipeId)
          return new Promise((resolve, reject) => {
            $http
              .get(`https://front-end-capstone-b8669.firebaseio.com/recipes/${recipeId}.json`)
              .then((data) => {
                console.log("factory data", data);
                res = data.data;
                Object.keys(res).forEach((key)=> {
                  res[key].id = key;
                  stats.push(res[key]);
                });
                console.log("stats", stats)
                resolve(stats);
              })
          })

        },

      postRecipe(newRecipe) {
        return $http
          .post(`https://front-end-capstone-b8669.firebaseio.com/recipes.json`, angular.toJson(newRecipe));
      }

      // deleteSelected(delete) {
      //   return $http
      //   .delete(`https://front-end-capstone-b8669.firebaseio.com/recipes.json`)
      // }
  }
})
