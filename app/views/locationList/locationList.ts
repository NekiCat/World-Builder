/// <reference path="../../../typings/index.d.ts"/>
module WorldBuilder {
    /**
     * Interface for the scope of a LocationListController.
     */
    export interface LocationListScope extends CommonListScope<Location> {
        $storage: ProjectStorage;
        project: Project;
    }

    /**
     * Controller for the location overview.
     */
    export class LocationListController {
        static $inject = ["$scope", "$localStorage", "$routeParams", "$location"];

        constructor(private $scope: LocationListScope, $localStorage: ng.storage.IStorageService, $routeParams: ProjectRouteParams, $location: ng.ILocationService) {
            $scope.$storage = <ProjectStorage>$localStorage.$default({ projects: [] });
            $scope.project = $scope.$storage.projects.filter((p) => p.guid === $routeParams.project)[0];
            if (!$scope.project) {
                $location.path("/projects");
            }

            $scope.createItem = () => Util.createNameable($scope.project.locations, Location);
            $scope.removeItem = (l) => Util.removeStart($scope.project.locations, l);
            $scope.removeUndo = (l) => Util.removeUndo($scope.project.locations, l);
            $scope.$on('$locationChangeSuccess', () => {
                Util.removeEnd($scope.project.locations);
                $localStorage.$apply();
            });
        }
    }

    Util.registerAngularController("LocationListController", LocationListController,
        "/projects/:project/locations", "views/locationList/locationList.html");
}
