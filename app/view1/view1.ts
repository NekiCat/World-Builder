/// <reference path="../../typings/index.d.ts"/>
module WorldBuilder {
    export interface View1Scope extends ng.IScope {
        test: string;
    }

    export class View1Controller {
        static $inject = ["$scope"];

        constructor(private $scope: View1Scope) {
            $scope.test = "Hello World!";
        }
    }

    angular.module("WorldBuilder")
        .config(["$routeProvider", ($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider.when("/view1", {
                templateUrl: "view1/view1.html",
                controller: "View1Controller"
            });
        }])
        .controller("View1Controller", View1Controller);
}
