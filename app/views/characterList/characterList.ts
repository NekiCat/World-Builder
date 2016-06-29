/// <reference path="../../../typings/index.d.ts"/>
module WorldBuilder {
    import IAngularEvent = angular.IAngularEvent;
    /**
     * Interface for the scope of a CharacterListController.
     */
    export interface CharacterListScope extends ng.IScope {
        $storage: ProjectStorage;
        project: Project;
        createCharacter: () => void;
        deleteCharacter: (character: Character) => void;
        deleteCharacterUndo: (character: Character) => void;
    }

    /**
     * Controller for the character overview.
     */
    export class CharacterListController {
        static $inject = ["$scope", "$localStorage", "$routeParams", "$location"];

        constructor(private $scope: CharacterListScope, $localStorage: ng.storage.IStorageService, $routeParams: ProjectRouteParams, $location: ng.ILocationService) {
            this.$scope.$storage = <ProjectStorage>$localStorage.$default({ projects: [] });
            this.$scope.project = this.$scope.$storage.projects.filter((p) => p.guid === $routeParams.project)[0];
            if (!this.$scope.project) {
                $location.path("/projects");
            }

            this.$scope.createCharacter = () => Util.insertNameable(this.$scope.project.characters, Character);
            this.$scope.deleteCharacter = (c) => Util.removeStart(this.$scope.project.characters, c);
            this.$scope.deleteCharacterUndo = (c) => Util.removeUndo(this.$scope.project.characters, c);
            this.$scope.$on('$locationChangeSuccess', (e: IAngularEvent) => {
                Util.removeEnd($scope.project.characters);
                $localStorage.$apply();
            });
        }
    }

    Util.registerAngularController("CharacterListController", CharacterListController,
        "/projects/:project/characters", "views/characterList/characterList.html");
}
