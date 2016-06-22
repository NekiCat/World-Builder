/// <reference path="../../../typings/index.d.ts"/>
module WorldBuilder {
    /**
     * Interface for the scope of a LocationListController.
     */
    export interface LocationListScope extends ng.IScope {
        $storage: ProjectStorage;
        project: Project;
    }

    /**
     * Controller for the location overview.
     */
    export class LocationListController {
        static $inject = ["$scope", "$localStorage", "$routeParams"];

        constructor(private $scope: LocationListScope, $localStorage: ng.storage.IStorageService, $routeParams: ProjectRouteParams) {
            this.$scope.$storage = <ProjectStorage>$localStorage.$default({
                projects: []
            });

            this.$scope.project = this.$scope.$storage.projects.filter((p) => p.guid === $routeParams.project)[0];
        }
    }

    angular.module("WorldBuilder")
        .config(["$routeProvider", ($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider.when("/projects/:project/locations", {
                templateUrl: "views/locationList/locationList.html",
                controller: "LocationListController"
            });
        }])
        .controller("LocationListController", LocationListController);
}
