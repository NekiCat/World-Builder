/// <reference path="../../../typings/index.d.ts"/>
module WorldBuilder {
    /**
     * Interface for the scope of a ProjectController.
     */
    export interface ProjectsScope extends ng.IScope {
        $storage: ProjectStorage;
        createProject: () => void;
        deleteProject: (project: Project) => void;
    }

    /**
     * Interface for the project storage.
     */
    export interface ProjectStorage extends ng.storage.IStorageService {
        projects: Project[];
    }

    /**
     * Controller for the projects overview.
     */
    export class ProjectsController {
        static $inject = ["$scope", "$localStorage"];

        constructor(private $scope: ProjectsScope, $localStorage: ng.storage.IStorageService) {
            this.$scope.$storage = <ProjectStorage>$localStorage.$default({
                projects: []
            });

            this.$scope.createProject = () => this.createProject.call(this);
            this.$scope.deleteProject = (p) => this.deleteProject.call(this, p);
        }

        public createProject() {
            if (this.$scope.$storage.projects.filter((p) => p.name.toLowerCase() === "new project").length) {
                var num = 1;
                //noinspection JSReferencingMutableVariableFromClosure
                while (this.$scope.$storage.projects.filter((p) => p.name.toLowerCase() === "new project (" + num.toString() + ")").length) {
                    num++;
                }
                this.$scope.$storage.projects.push(new Project("New Project (" + num.toString() + ")"));
            } else {
                this.$scope.$storage.projects.push(new Project("New Project"));
            }
        }

        public deleteProject(project: Project) {
            var pos = this.$scope.$storage.projects.indexOf(project);
            if (pos >= 0) {
                this.$scope.$storage.projects.splice(pos, 1);
            }
        }
    }

    angular.module("WorldBuilder")
        .config(["$routeProvider", ($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider.when("/", {
                templateUrl: "views/projects/projects.html",
                controller: "ProjectsController"
            });
        }])
        .controller("ProjectsController", ProjectsController);
}
