angular.element(document).ready(function() {
    var workApp = angular.module('work-app', []);

    workApp.controller('work-ctrl', ['$scope', '$http', function($scope, $http) {
        $http.get('/config/resume.json').then(
            function(resumeData) {
                $scope.resume = resumeData.data;
            },
            function(workErr) {
                console.log(workErr);
            }
        );
    }]);
    angular.bootstrap(document.getElementById('work-app'), ['work-app']);
});
