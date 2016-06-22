/// <reference path="../../../typings/index.d.ts"/>
module WorldBuilder {
    /**
     * Interface for the scope of a TermListController.
     */
    export interface TermListScope extends ng.IScope {
        $storage: ProjectStorage;
        project: Project;
    }

    /**
     * Controller for the term overview.
     */
    export class TermListController {
        static $inject = ["$scope", "$localStorage", "$routeParams"];

        constructor(private $scope: TermListScope, $localStorage: ng.storage.IStorageService, $routeParams: ProjectRouteParams) {
            this.$scope.$storage = <ProjectStorage>$localStorage.$default({
                projects: []
            });

            this.$scope.project = this.$scope.$storage.projects.filter((p) => p.guid === $routeParams.project)[0];
        }
    }

    angular.module("WorldBuilder")
        .config(["$routeProvider", ($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider.when("/projects/:project/terms", {
                templateUrl: "views/termList/termList.html",
                controller: "TermListController"
            });
        }])
        .controller("TermListController", TermListController);
}
