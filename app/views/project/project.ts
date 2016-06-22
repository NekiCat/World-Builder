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
        static $inject = ["$scope", "$localStorage", "$routeParams"];

        constructor(private $scope: ProjectScope, $localStorage: ng.storage.IStorageService, $routeParams: ProjectRouteParams) {
            this.$scope.$storage = <ProjectStorage>$localStorage.$default({
                projects: []
            });

            this.$scope.project = this.$scope.$storage.projects.filter((p) => p.name === $routeParams.project)[0];
        }
    }

    angular.module("WorldBuilder")
        .config(["$routeProvider", ($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider.when("/projects/:project", {
                templateUrl: "views/project/project.html",
                controller: "ProjectController"
            });
        }])
        .controller("ProjectController", ProjectController);
}
