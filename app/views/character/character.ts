/// <reference path="../../../typings/index.d.ts"/>
module WorldBuilder {
    /**
     * Interface for the scope of a CharacterListController.
     */
    export interface CharacterScope extends ng.IScope {
        $storage: ProjectStorage;
        project: Project;
        character: Character;
    }

    export interface CharacterRouteParams extends ProjectRouteParams {
        character: string;
    }

    /**
     * Controller for the character.
     */
    export class CharacterController {
        static $inject = ["$scope", "$localStorage", "$routeParams", "$location"];

        constructor(private $scope: CharacterScope, $localStorage: ng.storage.IStorageService, $routeParams: CharacterRouteParams, $location: ng.ILocationService) {
            $scope.$storage = <ProjectStorage>$localStorage.$default({ projects: [] });
            $scope.project = $scope.$storage.projects.filter((p) => p.guid === $routeParams.project)[0];
            if (!$scope.project) {
                $location.path("/projects");
            }

            $scope.character = $scope.project.characters.filter((c) => c.guid === $routeParams.character)[0];
            if (!$scope.character) {
                $location.path(`/projects/${$scope.project.guid}/characters`);
            }
        }
    }

    Util.registerAngularController("CharacterController", CharacterController,
        "/projects/:project/characters/:character", "views/character/character.html");
}
