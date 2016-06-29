/// <reference path="../../../typings/index.d.ts"/>
module WorldBuilder {
    /**
     * Interface for the scope of an EventListController.
     */
    export interface EventListScope extends CommonListScope<Event> {
        $storage: ProjectStorage;
        project: Project;
    }

    /**
     * Controller for the events overview.
     */
    export class EventListController {
        static $inject = ["$scope", "$localStorage", "$routeParams", "$location"];

        constructor(private $scope: EventListScope, $localStorage: ng.storage.IStorageService, $routeParams: ProjectRouteParams, $location: ng.ILocationService) {
            $scope.$storage = <ProjectStorage>$localStorage.$default({ projects: [] });
            $scope.project = this.$scope.$storage.projects.filter((p) => p.guid === $routeParams.project)[0];
            if (!$scope.project) {
                $location.path("/projects");
            }

            $scope.createItem = () => Util.createNameable($scope.project.events, Event);
            $scope.removeItem = (e) => Util.removeStart($scope.project.events, e);
            $scope.removeUndo = (e) => Util.removeUndo($scope.project.events, e);
            $scope.$on('$locationChangeSuccess', () => {
                Util.removeEnd($scope.project.events);
                $localStorage.$apply();
            });
        }
    }

    Util.registerAngularController("EventListController", EventListController,
        "/projects/:project/events", "views/eventList/eventList.html");
}
