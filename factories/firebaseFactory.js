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
      getRecipeDetail(details) {
        let stats = [];
        console.log(details)
          return new Promise((resolve, reject) => {
            $http
              .get('https://front-end-capstone-b8669.firebaseio.com/recipes/${details}.json')
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

      postRecipe() {
        return $http
          .post(`https://front-end-capstone-b8669.firebaseio.com.json`);
      }
  }
})
