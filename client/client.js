var app = angular.module('app', []);

app.controller('PersonController', ['$http', function($http){
  var controller = this;
  // controller.name = '';
  // controller.address = '';
  // controller.city = '';
  // controller.state = '';
  // controller.zipcode = '';
  controller.personObject = {};
  controller.peopleList = [];

  controller.sendData = function() {
    $http.post('/people', controller.personObject)
      .then(function(serverResponse){
        console.log(serverResponse);
        controller.personObject = {};
        controller.getData();

      });

  };

  controller.getData = function(){
    $http.get('/people').then(function(serverResponse){
      // console.log(serverResponse.data);
      controller.peopleList = serverResponse.data;
    });
  };

  controller.getData();
}]);
