/// <reference path="../../../typings/index.d.ts"/>
module WorldBuilder {
    /**
     * Interface for the scope of a TimelineController.
     */
    export interface TimelineScope extends ng.IScope {
        $storage: ProjectStorage;
        project: Project;
    }

    /**
     * Controller for the time line.
     */
    export class TimelineController {
        static $inject = ["$scope", "$localStorage", "$routeParams", "$location"];

        constructor(private $scope: TimelineScope, $localStorage: ng.storage.IStorageService, $routeParams: ProjectRouteParams, $location: ng.ILocationService) {
            this.$scope.$storage = <ProjectStorage>$localStorage.$default({ projects: [] });
            this.$scope.project = this.$scope.$storage.projects.filter((p) => p.guid === $routeParams.project)[0];
            if (!this.$scope.project) {
                $location.path("/projects");
            }
        }
    }

    Util.registerAngularController("TimelineController", TimelineController,
        "/projects/:project/timeline", "views/timeline/timeline.html");
}
