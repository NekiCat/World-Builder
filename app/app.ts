/// <reference path="../typings/index.d.ts" />

module WorldBuilder {
    angular.module("WorldBuilder", ["ngRoute"])
        .config(["$locationProvider", "$routeProvider", ($locationProvider: ng.ILocationProvider, $routeProvider: ng.route.IRouteProvider) => {
            $locationProvider.hashPrefix("!");
            $routeProvider.otherwise({ redirectTo: "/view1" });
        }]);
}
