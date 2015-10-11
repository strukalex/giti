angular.module('PortalApp')

.controller('gitiCtrl', ['$scope', '$http', '$q','gitiFactory', function ($scope, $http, $q, gitiFactory) {

    // SETUP

    // Widget Configuration
    $scope.portalHelpers.config = {
        
    };

    $scope.insertValue = gitiFactory.insertValue;
    $scope.loading = gitiFactory.loading;
    $scope.links = gitiFactory.links;
    $scope.openDataExampleData = gitiFactory.openDataExampleData;
    $scope.dbData =  gitiFactory.dbData;

    $scope.$watch('loading.value', function () {
        if ($scope.loading.value) {
            $scope.portalHelpers.showView('loading.html', 1,false);
            $scope.portalHelpers.toggleLoading(true);
        } else {
            $scope.portalHelpers.showView('main.html', 1);
            $scope.portalHelpers.toggleLoading(false);
        }
    });

    gitiFactory.init($scope);

    // DATABASE EXAMPLE

    $scope.getDbData = function () {
        $scope.portalHelpers.invokeServerFunction('getData').then(function (result) {
            $scope.dbData.value = result;
        });
    }

    // Try to get test data from the database
    $scope.getDbData();

    // Create table
    $scope.createTable = function () {
        $scope.portalHelpers.invokeServerFunction('createTable').then(function (result) {
            $scope.getDbData();
        });
    }

    // Insert a value into the database
    $scope.insertData = function () {
        if ($scope.insertValue.value.length > 50)
            alert('value should be less than 50 characters');
        else {
            $scope.portalHelpers.invokeServerFunction('insert', { value: $scope.insertValue.value }).then(function (result) {
                $scope.dbData.value = result;
            });
        }
    };

    // DETAILS VIEW EXAMPLE
    $scope.showView2 = function () {
        $scope.portalHelpers.showView('view2.html', 2);
    }

    $scope.showView3 = function () {
        $scope.portalHelpers.showView('view3.html', 3);
    }

}])
// Factory maintains the state of the widget
.factory('gitiFactory', ['$http', '$rootScope', '$filter', '$q', function ($http, $rootScope, $filter, $q) {
    var initialized = { value: false };
    var loading = { value: false };

    var insertValue = { value: null };
    var links = { value: null };
    var openDataExampleData = {value:null};
    var dbData = {value:null};

    var init = function ($scope) {
        if (initialized.value)
            return;
        
        initialized.value = true;
        loading.value = true;

        // PORTAL DATA SOURCE EXAMPLE

        // Get data for the widget
        $http.get('/ImportantLinks/JSONSource').success(function (data) {
            // Make data available in the scope
            links.value = data;
            loading.value = false;
        });

        // OPEN API EXAMPLE
        $scope.portalHelpers.invokeServerFunction('getOpenData').then(function (result) {
            openDataExampleData.value = result;
        });
    }

    return {
        init: init,
        loading: loading,
        insertValue: insertValue,
        links:links,
        openDataExampleData:openDataExampleData,
        dbData:dbData
    };

}])
// Custom directive example
.directive('gitiDirectiveName', ['$http', function ($http) {
    return {
        link: function (scope, el, attrs) {

        }
    };
}])
// Custom filter example
.filter('gitiFilterName', function () {
    return function (input, arg1, arg2) {
        // Filter your output here by iterating over input elements
        var output = input;
        return output;
    }
});