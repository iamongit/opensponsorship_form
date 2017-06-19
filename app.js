angular.module('formApp', ['ngAnimate', 'ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // route to show our basic form (/form)
        .state('form', {
            url: '/components/form',
            templateUrl: '/components/form.html',
            controller: 'formController'
        })

        // nested states
        // each of these sections will have their own view
        // url will be nested (/form/about)
        .state('form.about', {
            url: '/about',
            templateUrl: '/components/about.html'
        })

        // url will be /form/basic-info
        .state('form.basic-info', {
            url: '/basic-info',
            templateUrl: '/components/basic-info.html'
        })

        // url will be /form/social-media
        .state('form.social-media', {
            url: '/social-media',
            templateUrl: '/components/social-media.html'
        })

        // url will be /form/summary
        .state('form.summary', {
          url: '/summary',
          templateUrl: '/components/summary.html'
        })

        .state('form.bonus-list', {
          url: '/bonus-list',
          templateUrl: '/components/bonus-list.html'
        });

    // catch all route
    // send users to the form page
    $urlRouterProvider.otherwise('/components/form/basic-info');
})

// our controller for the form
// =============================================================================
.controller('formController', function($scope, $http, $location, $window) {

    // we will store all of our form data in this object
    $scope.formData = {};
    $scope.archivesData = [];
    $scope.showArchives = false;

    // $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';


    //Array to display data in original order rather than alphabetical order -
    // - on using ng-repeat in the summary template
    $scope.summaryArray = [];

    $scope.generateSummary = function(){
      // if($scope.formData.name===undefined) $window.location.hash = '#/components/form/basic-info';
      //ui-sref="form.summary"
      console.log(Object.keys($scope.formData).length,$scope.formData[Object.keys($scope.formData)[0]], "validation test" );
      if((Object.keys($scope.formData).length === 0) || ($scope.formData[Object.keys($scope.formData)[0]] === undefined) ) {
        alert('Form empty, start again!');
        $location.url('/basic-info');
      } else {
        var objectToArray = [];
        for(var key in $scope.formData){
          var obj = {};
          obj[key] = $scope.formData[key];
          objectToArray.push(obj);
        }
        $scope.summaryArray = objectToArray;
        $window.location.hash = ('#/components/form/summary')
      }
    };

    // function to process the form
    $scope.processForm = function() {
      //Prevent from making API call on form-submit if object is empty
      if($scope.formData.name){
          $http({
            method: 'POST',
            url: '/api/insertProfile',
            headers: {'Content-Type': 'application/JSON'},
            data: {
                profileObject: $scope.formData
            }
          })
          .then (function(results) {
            // console.log(results);
            alert('awesome!');
            $scope.formData = {};
            $scope.summaryArray = [];
            $location.url('/basic-info');
          })
          .catch(function(error) {
            console.log(error);
            alert($scope.errorCodes[error.data]);
          });
        }
    };

    //function to clear the form
    $scope.clearForm = function() {
      $scope.formData = {};
      $scope.summaryArray = [];
      $location.url('/basic-info');
    };

    //function to get saved profiles
    $scope.getArchives = function() {
      $http({
        method: 'GET',
        url: '/api/archives',
      })
      .then (function(data) {
        // console.log(data, "ARCHIVE DATA");
        var arrLength = data.data.length;
        $scope.archivesData = [];
        for (var i=0; i<arrLength; i++) {
          if (data.data[i]) {
            $scope.archivesData.push(data.data[i]);
          }
        }
        // console.log($scope.archivesData, "$scope.archivesData")
        $scope.archivesData.forEach(function(entry) {
          var cleanTime = entry.timestamp.slice(11,16) + '  ' + entry.timestamp.slice(5,7) + '/' + entry.timestamp.slice(8,10) + '/' + entry.timestamp.slice(0,4);
          entry.timestamp = cleanTime;
        });
        $scope.showArchives = true;
      })
      .catch(function(error) {
        console.log('GETTING ARCHIVES ERROR: ', error);
      });
    };

})

.directive('summaryDirective', function(){
    return {
      restrict : 'EA',
      transclude : false,
      templateUrl : 'form/summary.html',
      scope: {
         listcolumns: "="
      },
      link : function(scope, element, attrs) {
    }
  }
})

//filter to capitalize first character of object keys
.filter('capitalize', function() {
    return function(input) {
      return (input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
