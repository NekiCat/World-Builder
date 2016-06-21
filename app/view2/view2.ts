/// <reference path="../../typings/index.d.ts"/>
module WorldBuilder {
    export interface View2Scope extends ng.IScope {
    }

    export class View2Controller {
        static $inject = ["$scope"];

        constructor(private $scope: View2Scope) {
        }
    }

    angular.module("WorldBuilder")
        .config(["$routeProvider", ($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider.when("/view2", {
                templateUrl: "view2/view2.html",
                controller: "View2Controller"
            });
        }])
        .controller("View2Controller", View2Controller);
}
