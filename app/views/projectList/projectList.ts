/// <reference path="../../../typings/index.d.ts"/>
module WorldBuilder {
    /**
     * Interface for the project storage.
     */
    export interface ProjectStorage extends ng.storage.IStorageService {
        projects: Project[];
    }

    /**
     * Controller for the projects overview.
     */
    export class ProjectListController {
        static $inject = ["$scope", "$localStorage"];

        constructor(private $scope: ProjectListScope, $localStorage: ng.storage.IStorageService) {
            this.$scope.$storage = <ProjectStorage>$localStorage.$default({
                projects: []
            });

            this.$scope.createProject = () => this.createProject.call(this);
            this.$scope.deleteProject = (p) => this.deleteProject.call(this, p);
        }

        public createProject() {
            let project = new Project();
            project.name = "New Project";

            if (this.$scope.$storage.projects.filter((p) => p.name.toLowerCase() === "new project").length) {
                var num = 1;
                //noinspection JSReferencingMutableVariableFromClosure
                while (this.$scope.$storage.projects.filter((p) => p.name.toLowerCase() === "new project (" + num.toString() + ")").length) {
                    num++;
                }
                project.name += " (" + num.toString() + ")";
            }

            this.$scope.$storage.projects.push(project);
        }

        public deleteProject(project: Project) {
            Util.removeConfirmed(this.$scope.$storage.projects, project, "Do you really want to delete '{0}'? This cannot be undone!");
        }
    }

    angular.module("WorldBuilder")
        .config(["$routeProvider", ($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider.when("/projects", {
                templateUrl: "views/projectList/projectList.html",
                controller: "ProjectListController"
            });
        }])
        .controller("ProjectListController", ProjectListController);
}
