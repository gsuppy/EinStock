(function() {
  'use strict'

  angular
    .module('einstock.algorithm', [
      'ngMaterial',
      'ngMessages'
    ])

    //this will be the controller to create new campaigns
    .controller('AlgorithmController', AlgorithmController);

  AlgorithmController.$inject = ['$scope', 'Algorithm', 'TickValidation'];

  function AlgorithmController($scope, Algorithm, TickValidation) {
    //temp place holders
    $scope.algSelections = ['Neighbors', 'Forest', 'Support Vectors', 'Logistic', 'Naive Bayes'];
    $scope.selection = $scope.algSelections[0];
    //-----------------------------------------
    //init a start date
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 7);
    //-----------------------------------------
    $scope.data = {
      startDate: firstDate,
      endDate: new Date(),
      ticker: '',
      algorithm: $scope.selection,
      userId: angular.fromJson(localStorage.getItem('profile')).identities[0].user_id
    }


    $scope.log = function() {
      Algorithm.post($scope.data).success(function(data) {
        console.log(data);
        localStorage.setItem('data', angular.toJson(data));
      }).then(Algorithm.redirect());
    }

    $scope.tickTest = function() {
     return TickValidation.isValid($scope.data.ticker);
    }

    // $scope.dash = function() {
    //   return Algorithm.redirect();
    // }
  }

})();