/// <reference path="../typings/index.d.ts" />

module WorldBuilder {
    /**
     * Interface for the scope of a ProjectController.
     */
    export interface ProjectListScope extends ng.IScope {
        $storage: ProjectStorage;
        createProject: () => void;
        deleteProject: (project: Project) => void;
    }

    angular.module("WorldBuilder", ["ngRoute", "ngStorage"])
        .config(["$locationProvider", "$routeProvider", ($locationProvider: ng.ILocationProvider, $routeProvider: ng.route.IRouteProvider) => {
            $locationProvider.hashPrefix("!");
            $routeProvider.otherwise({ redirectTo: "/view1" });
        }])
        .filter("escape", ["$window", ($window) => {
            return $window.encodeURIComponent;
        }]);
}
