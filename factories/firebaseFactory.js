app.factory('firebaseFactory', function($http){

    return{
        getFirebaseBins(){
            return $http
            .get('https://front-end-capstone-b8669.firebaseio.com//bins.json')
            .then((res)=>{
                console.log("factory res", res);
                return res.data
            })
        },
        getFirebaseScraps(){
            return $http
            .get('https://front-end-capstone-b8669.firebaseio.com//scraps.json')
            .then((res)=>{
                console.log("factory res", res);
                return res.data
            })
        },
        getFirebaseUsers(){
            return $http
            .get('https://front-end-capstone-b8669.firebaseio.com//users.json')
            .then((res)=>{
                console.log("factory res", res);
                return res.data

            })
        },
        postScrap(scrap){
            return $http
                .post(`https://front-end-capstone-b8669.firebaseio.com//bins.json`, scrap);
        }

    }
})
