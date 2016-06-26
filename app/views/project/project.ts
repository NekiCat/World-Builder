/// <reference path="../../../typings/index.d.ts"/>
module WorldBuilder {
    /**
     * Interface for the scope of a ProjectController.
     */
    export interface ProjectScope extends ng.IScope {
        $storage: ProjectStorage;
        project: Project;
    }

    /**
     * Interface for the route params of a ProjectController.
     */
    export interface ProjectRouteParams extends ng.route.IRouteParamsService {
        project: string;
    }

    /**
     * Controller for the project overview.
     */
    export class ProjectController {
        static $inject = ["$scope", "$localStorage", "$routeParams", "$location"];

        constructor(private $scope: ProjectScope, $localStorage: ng.storage.IStorageService, $routeParams: ProjectRouteParams, $location: ng.ILocationService) {
            this.$scope.$storage = <ProjectStorage>$localStorage.$default({ projects: [] });
            this.$scope.project = this.$scope.$storage.projects.filter((p) => p.guid === $routeParams.project)[0];
            if (!this.$scope.project) {
                $location.path("/projects");
            }
        }
    }

    Util.registerAngularController("ProjectController", ProjectController,
        "/projects/:project", "views/project/project.html");
}
