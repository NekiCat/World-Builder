/// <reference path="../../../typings/index.d.ts"/>
module WorldBuilder {
    /**
     * Interface for the scope of a ProjectController.
     */
    export interface ProjectListScope extends ng.IScope {
        $storage: ProjectStorage;
        createProject: () => void;
        deleteProject: (project: Project) => void;
    }

    /**
     * Controller for the projects overview.
     */
    export class ProjectListController {
        static $inject = ["$scope", "$localStorage"];

        constructor(private $scope: ProjectListScope, $localStorage: ng.storage.IStorageService) {
            this.$scope.$storage = <ProjectStorage>$localStorage.$default({ projects: [] });
            this.$scope.createProject = () => this.createProject.call(this);
            this.$scope.deleteProject = (p) => this.deleteProject.call(this, p);
        }

        public createProject() {
            Util.insertNameable(this.$scope.$storage.projects, Project);
        }

        public deleteProject(project: Project) {
            Util.removeConfirmed(this.$scope.$storage.projects, project, "Do you really want to delete '{0}'? This cannot be undone!");
        }
    }

    Util.registerAngularController("ProjectListController", ProjectListController,
        "/projects", "views/projectList/projectList.html");
}
