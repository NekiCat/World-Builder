/// <reference path="../../../typings/index.d.ts"/>
module WorldBuilder {
    /**
     * Interface for the scope of an EventListController.
     */
    export interface EventListScope extends ng.IScope {
        $storage: ProjectStorage;
        project: Project;
    }

    /**
     * Controller for the events overview.
     */
    export class EventListController {
        static $inject = ["$scope", "$localStorage", "$routeParams"];

        constructor(private $scope: EventListScope, $localStorage: ng.storage.IStorageService, $routeParams: ProjectRouteParams) {
            this.$scope.$storage = <ProjectStorage>$localStorage.$default({
                projects: []
            });

            this.$scope.project = this.$scope.$storage.projects.filter((p) => p.guid === $routeParams.project)[0];
        }
    }

    angular.module("WorldBuilder")
        .config(["$routeProvider", ($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider.when("/projects/:project/events", {
                templateUrl: "views/eventList/eventList.html",
                controller: "EventListController"
            });
        }])
        .controller("EventListController", EventListController);
}
