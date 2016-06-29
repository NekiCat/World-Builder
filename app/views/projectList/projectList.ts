/// <reference path="../../../typings/index.d.ts"/>
module WorldBuilder {
    /**
     * Interface for the scope of a ProjectController.
     */
    export interface ProjectListScope extends CommonListScope<Project> {
        $storage: ProjectStorage;
    }

    /**
     * Controller for the projects overview.
     */
    export class ProjectListController {
        static $inject = ["$scope", "$localStorage"];

        constructor(private $scope: ProjectListScope, $localStorage: ng.storage.IStorageService) {
            $scope.$storage = <ProjectStorage>$localStorage.$default({ projects: [] });
            $scope.createItem = () => Util.createNameable($scope.$storage.projects, Project);
            $scope.removeItem = (p) => Util.removeStart($scope.$storage.projects, p);
            $scope.removeUndo = (p) => Util.removeUndo($scope.$storage.projects, p);
            $scope.$on('$locationChangeSuccess', () => {
                Util.removeEnd($scope.$storage.projects);
                $localStorage.$apply();
            });
        }
    }

    Util.registerAngularController("ProjectListController", ProjectListController,
        "/projects", "views/projectList/projectList.html");
}
