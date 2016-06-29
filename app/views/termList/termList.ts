/// <reference path="../../../typings/index.d.ts"/>
module WorldBuilder {
    /**
     * Interface for the scope of a TermListController.
     */
    export interface TermListScope extends CommonListScope<Term> {
        $storage: ProjectStorage;
        project: Project;
    }

    /**
     * Controller for the term overview.
     */
    export class TermListController {
        static $inject = ["$scope", "$localStorage", "$routeParams", "$location"];

        constructor(private $scope: TermListScope, $localStorage: ng.storage.IStorageService, $routeParams: ProjectRouteParams, $location: ng.ILocationService) {
            $scope.$storage = <ProjectStorage>$localStorage.$default({ projects: [] });
            $scope.project = $scope.$storage.projects.filter((p) => p.guid === $routeParams.project)[0];
            if (!$scope.project) {
                $location.path("/projects");
            }

            $scope.createItem = () => Util.createNameable($scope.project.terms, Term);
            $scope.removeItem = (t) => Util.removeStart($scope.project.terms, t);
            $scope.removeUndo = (t) => Util.removeUndo($scope.project.terms, t);
            $scope.$on('$locationChangeSuccess', () => {
                Util.removeEnd($scope.project.terms);
                $localStorage.$apply();
            });
        }
    }

    Util.registerAngularController("TermListController", TermListController,
        "/projects/:project/terms", "views/termList/termList.html");
}
