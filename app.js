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
        });

    // catch all route
    // send users to the form page
    $urlRouterProvider.otherwise('/components/form/basic-info');
})

.controller('formController', function($scope, $http) {

    // will store all the form data in this object
    $scope.formData = {};

    // function to process the form
    $scope.processForm = function() {
      alert('Done');
      $scope.formData = {};
    };

});
